// const express = require('express');
// const Conversion = require('../models/conversion.model')
// const routerConversion = express.Router();
// require('../routes/conversion.routes')

// // GET all conversions
// const getAllConversions = async (req, res) => {
//     try {
//       // Fetch conversions based on specific conditions
//       const { id, sellerId, buyerId, readBySeller, readByBuyer, lastMessage } = req.query;
  
//       const getConversions = await Conversion.find({
//         id: id,
//         sellerId: sellerId,
//         buyerId: buyerId,
//         readBySeller: readBySeller,
//         readByBuyer: readByBuyer,
//         lastMessage: lastMessage
//       });
  
//       res.json(getConversions);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   const conversions = async (req, res) => {
//     //Destruct the data
//   const {id, sellerId, buyerId, readBySeller, readByBuyer, lastMessage } = req.body;

//     try {
//             if (!id || !sellerId || !buyerId || !readByBuyer || !lastMessage) {
//               throw new Error("All fields must be filled");
//             }
//         const newConversion = await Conversion.create({id, sellerId, buyerId, readBySeller, readByBuyer, lastMessage});
//         res.status(200).json({ message: "Message created", user: newConversion });
//       } catch (error) {
//         res.status(400).json({ error: error.message });
//       }

//   };

//   module.exports = {conversions, getAllConversions };

