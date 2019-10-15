const express = require("express");

const { Vehicle } = require("../models/Vehicle/model");
const createVehicle = require("../controllers/vehicle/create");
const listVehicles = require("../controllers/vehicle/list");

const models = { Vehicle };

const routersInit = () => {
  const router = express();
  router.post("/vehicle/create", createVehicle(models));
  router.get("/vehicles", listVehicles(models));
  return router;
};

module.exports = routersInit;
