const mongoose = require("mongoose");
const { schema } = require("./schema");

const Device = mongoose.model("Device", schema);
module.exports = { Device };
