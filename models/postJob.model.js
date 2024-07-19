const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    projectCategory: {
      type: [String], // Change type to an array of strings
      required: true,
    },

    applyJob: {
      type:String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
