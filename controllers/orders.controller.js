const asyncHandler = require("express-async-handler");
const orders_model  = require('../models/order.model');

const createOrder = asyncHandler(async (req, res) => {
    //deconstruct the data from the request
    const { skillId, img, title, price, sellerId, buyerId, isCompleted, payment_intent } = req.body;

    // Validation check 
    if (!skillId || !img || !title || !price || !sellerId || !buyerId || !isCompleted || !payment_intent) {
        res.status(400);
       throw new Error(" all fields are required");
    }
    const create_order = await orders_model.create({
        skillId,
        img,
        title,
        price,
        sellerId,
        buyerId,
        isCompleted,
        payment_intent        
      });
  
      res.status(201).json(create_order);
      console.log("The Created New order is:", req.body);
  });

  //Get single order routes by ID
  const getOrder = asyncHandler(async (req, res) => {
    // get contact using by id
    const find_user_by_id = await orders_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("User not found ");
    }
    res.status(200).json(find_user_by_id);
  });

 //Get update message routes by ID
const updateOrder = asyncHandler(async (req, res) => {
    // first get the contact by its id
    const find_user_by_id = await orders_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Contact not found");
    }
    // then update the skill
    const update_order = await orders_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(update_order);
  });

  //Get delete skill routes by ID
const deleteOrder = asyncHandler(async (req, res) => {
    const delete_order = await orders_model.findByIdAndDelete(req.params.id);
    res.status(200).json(delete_order);
  });

  module.exports = { createOrder, getOrder, updateOrder, deleteOrder }