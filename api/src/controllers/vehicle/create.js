const create = ({ Vehicle }) => (req, res, next) => {
  var vehicle = new Vehicle(req.body);

  vehicle
    .save()
    .then(() => {
      res.status(200).send("ok");
    })
    .catch(err => {
      next(err);
    });
};

module.exports = create;
