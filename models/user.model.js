const mongoose = require("mongoose");

// Define enum for roles
const validRoles = ['admin', 'freelancer', 'employee'];

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter a full name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    image: {
      type: String,
      required: false,
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
    role: {
      type: String,
      enum: validRoles, // Use enum to restrict values to valid roles
      default: 'freelancer', // Set a default role (e.g., 'freelancer')
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
