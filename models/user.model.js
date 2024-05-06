const mongoose = require("mongoose");

// Define enum for roles
const validRoles = ['admin', 'freelancer', 'employer'];
const userStatus = ['active', 'inactive'];

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter a last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    country: {
      type: String,
      required: [true, "Please enter a country"],
    },
    role: {
      type: String,
      enum: validRoles, // Use enum to restrict values to valid roles
    },
    status: {
      type: String,
      enum: userStatus, // Use enum to restrict values to valid roles
      default: 'active', // Set a default role (e.g., 'freelancer')
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
