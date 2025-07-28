// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone:String,
  email: String,
  city: String,
  address: String,
  price: String,
  occupation: String,
  image: String,
});

module.exports = mongoose.model("Userss", userSchema);
