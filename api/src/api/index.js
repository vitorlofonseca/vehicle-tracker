const express = require("express");

const { Device } = require("../models/Device/model");
const { Metric } = require("../models/Metric/model");
const models = { Device, Metric };

const createDevice = require("../controllers/device/create");
const authInDevice = require("../controllers/device/auth");
const setVehicle = require("../controllers/device/setVehicle");
const getDevice = require("../controllers/device/get");

const pushMetric = require("../controllers/metric/push");

const routersInit = () => {
  const router = express();
  router.post("/device/create", createDevice(models));
  router.post("/device/auth", authInDevice(models));
  router.post("/device/setVehicle", setVehicle(models));
  router.get("/device/:macAddress", getDevice(models));

  router.post("/metric", pushMetric(models));
  return router;
};

module.exports = routersInit;
