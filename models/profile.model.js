const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
       required: false,
       ref:"User",
  },
    title: {
      type: String,
      required: [true, "Please enter your title"],
    },
    hourlyRate: {
      type: String,
      required: [true, "Please enter an hourly rate"],
    },
    workHistory: {
      type: String,
      required: false,
    },
    portfolio: {
      type: String,
      required: false,
    },
    skill: {
      type: String,
      required: false,
    },
    testimonial: {
      type: String,
      required: false,
    },
    certification: {
      type: String,
      required: false,
    },
    employmentHistory: {
      type: String,
      required: false,
    },
    otherExperience: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Profile", userSchema);
