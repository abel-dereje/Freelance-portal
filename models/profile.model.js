const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
       ref:"User",
    },
    title: {
      type: String,
      required: true,
    },
    hourlyRate: {
      type: String,
      required: true,
    },
    workHistory: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
    certification: {
      type: String,
      required: true,
    },
    employmentHistory: {
      type: String,
      required: true,
    },
    otherExperience: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
