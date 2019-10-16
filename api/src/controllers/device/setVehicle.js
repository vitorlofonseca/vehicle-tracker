function macAddressIsSetted(req) {
  if (!req.body.macAddress) {
    return false;
  }
  return true;
}
function vehicleDataIsInvalid(req) {
  const vehicle = req.body.vehicle;
  let errors = [];

  if (!vehicle.manufacturer) {
    errors.push("'manufacturer' field is not defined");
  }
  if (!vehicle.model) {
    errors.push("'model' field is not defined");
  }
  if (!vehicle.year) {
    errors.push("'year' field is not defined");
  }
  if (!vehicle.plate) {
    errors.push("'plate' field is not defined");
  }

  if (errors.length > 0) {
    return errors.join(", ");
  }

  return null;
}

const setVehicle = ({ Device }) => async (req, res, next) => {
  try {
    if (!macAddressIsSetted(req)) {
      res.status(400).send("A macAddress field must be defined");
    }

    const reasonsVehicleDataIsInvalid = vehicleDataIsInvalid(req);

    if (reasonsVehicleDataIsInvalid) {
      res.status(400).send(reasonsVehicleDataIsInvalid);
    }

    await Device.update(
      { macAddress: req.body.macAddress },
      { vehicle: req.body.vehicle }
    );

    res.status(200).send("ok");
  } catch (e) {
    throw e.message;
  }
};

module.exports = setVehicle;
