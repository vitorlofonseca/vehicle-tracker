function validateNewDevice(device) {
  if (!device.password) {
    return "A password field must be defined";
  }
  if (!device.macAddress) {
    return "A macAddress field must be defined";
  }
  if (device.inUse !== false && device.inUse !== true) {
    return "A flag 'inUse' must be defined";
  }

  return false;
}

const create = ({ Device }) => (req, res, next) => {
  var device = new Device(req.body);
  device.metrics = { last: [], history: [] };
  try {
    let someDeviceError = validateNewDevice(device);

    if (someDeviceError) {
      res.status(400).send(someDeviceError);
    }

    device.save();
    res.status(200).send("ok");
  } catch (e) {
    throw e.message;
  }
};

module.exports = create;
