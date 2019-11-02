const CryptoJS = require("crypto-js");
const FIELDS_IN_TOKEN = 3;
const TOKEN_SHELF_LIFE_MILISECONDS = 60000;

function explodeToken(token) {
  let data = token.split("|");
  if (data.length != FIELDS_IN_TOKEN) {
    return {
      error:
        "The token must have the device mac, password and a date, representing the moment of token's generation"
    };
  }
  return data;
}

function getDevicePasswordByToken(token) {
  return explodeToken(token)[1];
}

function getDeviceMacByToken(token) {
  return explodeToken(token)[0];
}

function getDateByToken(token) {
  return explodeToken(token)[2];
}

function tokenTimeIsCurrent(generationDateToken) {
  let minimumDate = Date.now() - TOKEN_SHELF_LIFE_MILISECONDS;
  let maximumDate = Date.now();

  if (
    generationDateToken <= maximumDate &&
    generationDateToken >= minimumDate
  ) {
    return true;
  }
  return false;
}

function authForDevice(req, env) {
  let cipherToken = req.headers.token;
  let api_key = env.dashboard.api.key;

  let tokenBytes = CryptoJS.AES.decrypt(cipherToken, api_key);
  let plainToken = tokenBytes.toString(CryptoJS.enc.Utf8);

  let macAddress = plainToken.split("|")[0];
  let generationDateToken = plainToken.split("|")[1];

  if (macAddress != req.body.macAddress) {
    return {
      success: false,
      reason: "Access denied"
    };
  }

  if (!tokenTimeIsCurrent(generationDateToken)) {
    return {
      success: false,
      reason:
        "A token is valid through " +
        TOKEN_SHELF_LIFE_MILISECONDS / 1000 +
        " seconds. You must create another token"
    };
  }

  return { success: true };
}

const auth = async (req, env, { Device }) => {
  let urlRequest = req.originalUrl;
  if (urlRequest.endsWith("/device")) {
    return authForDevice(req, env);
  }

  let turnoff_auth = env.dashboard.api.turnoff_auth;
  let api_key = env.dashboard.api.key;

  if (turnoff_auth) {
    return { success: true };
  }

  let cipherToken = req.headers.token;

  let tokenBytes = CryptoJS.AES.decrypt(cipherToken, api_key);
  let plainToken = tokenBytes.toString(CryptoJS.enc.Utf8);

  let whyTokenHasAWrongFormat = explodeToken(plainToken).error;

  if (whyTokenHasAWrongFormat) {
    return { success: false, reason: whyTokenHasAWrongFormat };
  }

  let deviceMac = getDeviceMacByToken(plainToken);
  let devicePass = getDevicePasswordByToken(plainToken);
  let generationDateToken = getDateByToken(plainToken);

  let device = await Device.findOne({ macAddress: deviceMac });

  if (!device) {
    return {
      success: false,
      reason: "You passed a token for a device that doesn't exist"
    };
  }

  if (device.password != devicePass) {
    return {
      success: false,
      reason: "You passed a wrong MAC or password"
    };
  }

  if (!tokenTimeIsCurrent(generationDateToken)) {
    return {
      success: false,
      reason:
        "A token is valid through " +
        TOKEN_SHELF_LIFE_MILISECONDS / 1000 +
        " seconds. You must create another token"
    };
  }

  return { success: true };
};

module.exports = auth;
