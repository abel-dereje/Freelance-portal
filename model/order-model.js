const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  
},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Order", orderSchema);