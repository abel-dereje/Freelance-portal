const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
   skillID:{
        type:String,
        required:true,
   },
    userID:{
    type:String,
    required:true
    
   },
  star:{
    type:Number,
    required:true,
    enum:[1,2,3,4,5]
  },
  desc:{
    type:String,
    required:true,

  }

},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Review", reviewSchema);