const bcrypt = require("bcryptjs");

function validateNewDevice(device) {
  if (!device.password) {
    throw new Error("A password field must be defined");
  }
  if (!device.macAddress) {
    throw new Error("A macAddress field must be defined");
  }
  if (device.inUse !== false && device.inUse !== true) {
    throw new Error("A flag 'inUse' must be defined");
  }
}

function encryptPassword(password) {
  var salt = 10;
  return bcrypt.hashSync(password, salt);
}

const create = ({ Device }) => (req, res, next) => {
  var device = new Device(req.body);
  try {
    device.password = encryptPassword(req.body.password);
    validateNewDevice(device);
    device.save();
    res.status(200).send("ok");
  } catch (e) {
    throw e.message;
  }
};

module.exports = create;
