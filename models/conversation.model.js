const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
     required: false,
     ref:"User",
  }, 
  id:{
        type:String,
        required:true,
        unique:true,
   },
   sellerId: {
    type: String,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  readBySeller: {
    type: Boolean,
    required: true,
  },
  readByBuyer: {
    type: Boolean,
    required: true,
  },
  lastMessage: {
    type: String,
    required: false,
  },

},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Conversation", ConversationSchema);