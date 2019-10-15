const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  manufacturer: {
    type: String,
    required: [true]
  },
  model: {
    type: String,
    required: [true]
  },
  year: {
    type: Number,
    required: [true]
  }
});

module.exports = { schema };
