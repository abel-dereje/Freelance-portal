const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    subTitle: { 
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    totalStar: {
      type: Number, // Assuming this is a count, so using Number
      default: 0
    },
    numberStar: {
      type: Number, // Assuming this is a count, so using Number
      default: 0
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
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Correctly handles createdAt and updatedAt
  }
);

module.exports = mongoose.model("Skill", skillSchema);
