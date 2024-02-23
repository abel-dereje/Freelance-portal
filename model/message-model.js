const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
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