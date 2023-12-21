const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
   skillID:{
        type:String,
        required:true,
   },
    userID:{
    type:String,
    required:true
    
   },
  

},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Skill", skillSchema);