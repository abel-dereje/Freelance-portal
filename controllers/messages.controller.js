const asyncHandler = require("express-async-handler");
const messages_model  = require('../models/message.model');

const createMessage = asyncHandler(async (req, res) => {
    //deconstruct the data from the request
    const { conversationId, userId, desc } = req.body;

    // Validation check 
    if (!conversationId || !userId || !desc) {
        res.status(400);
       throw new Error(" all fields are required");
    }
    const create_messages = await messages_model.create({
        conversationId,
        userId,
        desc
      });
  
      res.status(201).json(create_messages);
      console.log("The Created New Message is:", req.body);
  });

  module.exports = { createMessage }