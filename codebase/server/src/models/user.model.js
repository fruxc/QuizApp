const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  role: {
    type: String,
    default: "user",
  },
  profile_picture: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
