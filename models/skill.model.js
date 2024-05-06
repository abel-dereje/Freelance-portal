const { Timestamp } = require("mongodb");
const mongoose = require('mongoose');

const skillSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
       required: false,
       ref:"User",
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
    type: String, // Assuming this is for a count, changed from String
    default: 0
   },
  numberStar: {
    type: String, // Changed from String if this is for a count of stars
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
  timestamps: true, // Fixed typo from timestamp
});

module.exports = mongoose.model("Skill", skillSchema);