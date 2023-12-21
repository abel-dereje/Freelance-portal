const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
   
},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Message", messageSchema);