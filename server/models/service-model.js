const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Service = mongoose.model("service", serviceSchema);
module.exports = Service;
