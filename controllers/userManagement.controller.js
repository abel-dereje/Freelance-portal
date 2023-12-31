// Importing the error handler module
const asyncHandler = require('express-async-handler');
// Importing the model module
const user_Model = require('../models/user.model');

// Define the getUsers function using asyncHandler to handle async operations
const getUsers = asyncHandler(async (req, res) => {
  
        // Retrieve all users from the database
        const users = await user_Model.find({user_id:req.find_user_by_id});
        // Send a successful response with the retrieved users
        res.status(200).json(users);
    
});

const getUser =asyncHandler(async (req, res) => {
    // get contact using by id 
    const find_user_by_id = await user_Model.findById(req.params.id);
    if (!find_user_by_id) {
        res.status(404);
        throw new Error ("User not found ");
    }
    res.status(200).json(find_user_by_id);
    });

const updateUsers = asyncHandler(async (req, res) => {
        // first get the contact by its id 
        const find_user_by_id= await user_Model.findById(req.params.id);
        if (!find_user_by_id) {
             res.status(404);
             throw new Error("Contact not found");
        }
        // then update the contact
        const update_user = await user_Model.findByIdAndUpdate(req.params.id, req.body,  {new: true});
        res.status(200).json(update_user);
    });

    const deleteUsers =asyncHandler(async (req, res) => {
        const delete_user= await user_Model.findByIdAndDelete(req.params.id);
        res.status(200).json(delete_user);
    });
    

// Export the getUsers function
module.exports = { getUsers, getUser, updateUsers, deleteUsers };