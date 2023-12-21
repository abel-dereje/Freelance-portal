const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
   userID:{
    type:String,
    required:true
    
   },

  title:{
    type:String,
    required:true
 

  },
  subTittle:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  
  totalStar:{
    type:Number,
    default:0
  },

  numberStar:{
    type:String,
    default:0
  },
  address:{
    type:String,
    required:false,
  },
  location:{
    type:String,
    required:false,
  },
  bio:{
    type:String,
    required:true,
  },
  price:{
    type:true,
    required:true,
  },
},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Skill", skillSchema);