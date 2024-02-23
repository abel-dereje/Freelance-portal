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

  //Get single message routes by ID
  const getMessage = asyncHandler(async (req, res) => {
    // get contact using by id
    const find_user_by_id = await messages_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("User not found ");
    }
    res.status(200).json(find_user_by_id);
  });

 //Get update message routes by ID
const updateMessage = asyncHandler(async (req, res) => {
    // first get the contact by its id
    const find_user_by_id = await messages_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Contact not found");
    }
    // then update the skill
    const update_message = await messages_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(update_message);
  });

  //Get delete skill routes by ID
const deleteMessage = asyncHandler(async (req, res) => {
    const delete_message = await messages_model.findByIdAndDelete(req.params.id);
    res.status(200).json(delete_message);
  });

  module.exports = { createMessage, getMessage, updateMessage, deleteMessage }