const express = require("express");
let bodyParser = require("body-parser");

const api = require("./src/api");
const env = require("./src/config/env");
const mongoManager = require("./src/mongo");

const app = express();
mongoManager.connect(env);

app.use(bodyParser.json());
app.use("/api/v1", api());

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
