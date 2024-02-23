const asyncHandler = require("express-async-handler");
const conversations_model  = require('../models/conversation.model');

const createConversation = asyncHandler(async (req, res) => {
    //deconstruct the data from the request
    const { id, sellerId, buyerId, readBySeller, readByBuyer, lastMessage } = req.body;

    // Validation check 
    if (!id || !sellerId || !buyerId || !readBySeller || !readByBuyer || !lastMessage) {
        res.status(400);
       throw new Error(" all fields are required");
    }
    const create_conversations = await conversations_model.create({
        id,
        sellerId,
        buyerId,
        readBySeller,
        readByBuyer,
        lastMessage
                
      });
  
      res.status(201).json(create_conversations);
      console.log("The Created New Conversation is:", req.body);
  });

  //Get single conversation routes by ID
  const getConversation = asyncHandler(async (req, res) => {
    // get contact using by id
    const find_user_by_id = await conversations_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("User not found ");
    }
    res.status(200).json(find_user_by_id);
  });

 //Get update message routes by ID
const updateConversation = asyncHandler(async (req, res) => {
    // first get the contact by its id
    const find_user_by_id = await conversations_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Conversation not found");
    }
    // then update the skill
    const update_conversation = await conversations_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(update_conversation);
  });

  //Get delete skill routes by ID
const deleteConversation = asyncHandler(async (req, res) => {
    const delete_conversation = await conversations_model.findByIdAndDelete(req.params.id);
    res.status(200).json(delete_conversation);
  });

  module.exports = { createConversation, getConversation, updateConversation, deleteConversation }