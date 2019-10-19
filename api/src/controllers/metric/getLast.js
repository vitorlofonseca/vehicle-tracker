const getLast = ({ Device }) => async (req, res, next) => {
  let macAddress = req.params.macAddress;

  if (!macAddress) {
    res.status(400).send("The MAC address must be passed through the URL");
  }

  let foundDevice = await Device.findOne({ macAddress: macAddress });

  if (!foundDevice) {
    res.status(404).send("Device not found");
  }

  res.status(200).send(foundDevice.metrics.last);
};

module.exports = getLast;
