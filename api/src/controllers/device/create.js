var sha256 = require("js-sha256").sha256;

function validateNewDevice(device) {
  if (!device.password) {
    res.status(400).send("A password field must be defined");
  }
  if (!device.macAddress) {
    res.status(400).send("A macAddress field must be defined");
  }
  if (device.inUse !== false && device.inUse !== true) {
    res.status(400).send("A flag 'inUse' must be defined");
  }
}

function encryptPassword(password) {
  return sha256(password);
}

const create = ({ Device }) => (req, res, next) => {
  var device = new Device(req.body);
  device.metrics = { last: [], history: [] };
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
