const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
   id:{
        type:String,
        required:true,
        unique:true,
   },
    

},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Conversation", ConversationSchema);