const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    jobTitle: {
      type: String,
      required: true,
    },
    projectSkill: {
      type: String,
      required: false,
    },
    projectScope: {
      type: String,
      required: true,
    },
    projectBudget: {
      type: String,
      required: true,
    },
    postReview: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
