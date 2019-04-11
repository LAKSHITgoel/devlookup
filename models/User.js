const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  providername: {
    type: String
  },
  providerId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
