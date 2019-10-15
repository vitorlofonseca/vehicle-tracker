const mongoose = require("mongoose");
const { schema } = require("./schema");

const Vehicle = mongoose.model("Vehicle", schema);
module.exports = { Vehicle };
