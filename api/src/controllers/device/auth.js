const bcrypt = require("bcryptjs");

function macAddressIsSetted(req) {
  if (!req.body.macAddress) {
    return false;
  }
  return true;
}

function passwordIsSetted(req) {
  if (!req.body.password) {
    return false;
  }
  return true;
}

function macAddressHasBeenFound(foundDevice) {
  if (foundDevice) {
    return true;
  }
  return false;
}

function passwordMatched(device, password) {
  return bcrypt.compareSync(password, device.password);
}

function foundDeviceWithoutPassword(device) {
  device.password = "secret";
  return device;
}

const auth = ({ Device }) => async (req, res, next) => {
  try {
    if (!macAddressIsSetted(req)) {
      res.status(400).send("A 'macAddress' field must be setted");
    }
    if (!passwordIsSetted(req)) {
      res.status(400).send("A 'password' field must be setted");
    }

    const devices = await Device.find({ macAddress: req.body.macAddress });
    let foundDevice = devices[0];

    if (!macAddressHasBeenFound(foundDevice)) {
      res.status(401).send("MAC Address not found");
    }

    if (!passwordMatched(foundDevice, req.body.password)) {
      res.status(401).send("MAC Address or password is wrong");
    }

    foundDevice = foundDeviceWithoutPassword(foundDevice);

    res.status(200).send(foundDevice);
  } catch (error) {
    throw error.message;
  }
};

module.exports = auth;
