const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   userName:{
    type:String,
    required:[true, "User name is required"],
    unique:[true,"User must be unique"],
   },

  email:{
    type:String,
    required:[true, "Email Address is required"],
    unique:true,

  },
  password:{
    type:String,
    required:[true, "User name is required"],
  },
  
  image:{
    type:String,
  },

  phone:{
    type:String,
    required:false,
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
    required:false,
  },
  isSeller:{
    type:Boolean,
    default:false,
  },
},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("User", userSchema);