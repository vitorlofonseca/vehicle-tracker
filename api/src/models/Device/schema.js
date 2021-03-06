const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  macAddress: {
    type: String,
    required: [true]
  },
  password: {
    type: String,
    required: [true]
  },
  inUse: {
    type: Boolean,
    required: [true]
  },
  vehicle: {
    type: Object,
    required: [false]
  },
  metrics: {
    type: Object,
    required: [false],
    last: {
      type: Array
    },
    history: {
      type: Array
    }
  }
});

module.exports = { schema };
