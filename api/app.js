const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const api = require("./src/api");
const env = require("./src/config/env");
const mongoManager = require("./src/mongo");

const auth = require("./src/auth/auth");

const app = express();
mongoManager.connect(env);

const { Device } = require("./src/models/Device/model");
const models = { Device };

app.use(cors());
app.use(bodyParser.json());
app.use(async function(req, res, next) {
  let authentication = await auth(req, env, models);
  if (!authentication.success) {
    res.status(401).send(authentication.reason);
    return;
  }
  next();
});
app.use("/api/v1", api());

app.listen(env.api.port, function() {
  console.log("Listening");
});
