var mongoose = require("mongoose");

var analyticSchema = mongoose.Schema({
  created_at: {
    type: Date,
    required: true
  },
  host: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = analyticSchema
