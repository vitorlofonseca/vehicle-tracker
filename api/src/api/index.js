const express = require("express");

const { Device } = require("../models/Device/model");
const createDevice = require("../controllers/device/create");
const authInDevice = require("../controllers/device/auth");

const models = { Device };

const routersInit = () => {
  const router = express();
  router.post("/device/create", createDevice(models));
  router.post("/device/auth", authInDevice(models));
  return router;
};

module.exports = routersInit;
