const express = require("express");

const { Device } = require("../models/Device/model");
const models = { Device };

const createDevice = require("../controllers/device/create");
const authInDevice = require("../controllers/device/auth");
const setVehicle = require("../controllers/device/setVehicle");
const getDevice = require("../controllers/device/getDevice");

const routersInit = () => {
  const router = express();
  router.post("/device/create", createDevice(models));
  router.post("/device/auth", authInDevice(models));
  router.post("/device/setVehicle", setVehicle(models));
  router.get("/device/:macAddress", getDevice(models));
  return router;
};

module.exports = routersInit;
