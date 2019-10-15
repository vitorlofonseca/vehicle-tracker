const mongoose = require("mongoose");
const { schema } = require("./schema");

const Metric = mongoose.model("Metric", schema);
module.exports = { Metric };
