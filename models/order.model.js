const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
         
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
         required: false,
         ref:"User",
      },
      skillId: {
            type: String,
            required: true,
          },
          img: {
            type: String,
            required: false,
          },
          title: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          sellerId: {
            type: String,
            required: true,
          },
          buyerId: {
            type: String,
            required: true,
          },
          isCompleted: {
            type: Boolean,
            default: false,
          },
          payment_intent: {
            type: String,
            required: true,
          },
},
{
  timestamp:true,
}
 
);

module.exports = mongoose.model("Order", orderSchema);