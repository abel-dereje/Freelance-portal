const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: "string",
      required: [true, "Please enter a full name"],
    },
    email: {
      type: "string",
      required: [true, "Please enter an email"],
    },
    password: {
      type: "string",
      required: [true, "Please enter a phone number"],
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
