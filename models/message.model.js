const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
     required: false,
     ref:"User",
  },
    conversationId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Message", messageSchema);