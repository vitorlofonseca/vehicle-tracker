const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  code: {
    type: String,
    required: [true]
  },
  unit: {
    type: String,
    required: [true]
  },
  value: {
    type: String,
    required: [true]
  }
});

module.exports = { schema };
