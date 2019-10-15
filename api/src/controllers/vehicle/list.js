const list = ({ Vehicle }) => async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).send({ vehicles });
  } catch (error) {
    next(error);
  }
};

module.exports = list;
