// Importing the error handler module
const asyncHandler = require("express-async-handler");
// Importing the model module
const userManagement = require("../models/userManagement.model");

// Define the getUsers function using asyncHandler to handle async operations
const getUsers = asyncHandler(async (req, res) => {
  // Retrieve all users from the database
  const users = await userManagement.find({ user_id: req.find_user_by_id });
  // Send a successful response with the retrieved users
  res.status(200).json(users);
});
const createUsers = asyncHandler(async (req, res) => {
  //deconstruct the data from the request
  const { fullName, email, image, phone, address, location, bio, isSeller } =
    req.body;
  // validation check
  if (!fullName || !email || !phone) {
    res.status(400);
    throw new Error(" all fields are required or Mandatory");
  }
  // if email  is Exist 
  const user_email= await userManagement.findOne({email});
  if(user_email){
      res.status(400);
      throw new Error("User Email is Exist in the database");
  }
  // if the all fields are required then we need to create a const that access the model of  the database
  const create_users = await userManagement.create({
    fullName,
    email,
    image,
    phone,
    address,
    location,
    bio,
    isSeller,
  });
  res.status(201).json(create_users);
  console.log("The Created New Contacts is:", req.body);
});

const getUser = asyncHandler(async (req, res) => {
  // get contact using by id
  const find_user_by_id = await userManagement.findById(req.params.id);
  if (!find_user_by_id) {
    res.status(404);
    throw new Error("User not found ");
  }
  res.status(200).json(find_user_by_id);
});

const updateUsers = asyncHandler(async (req, res) => {
  // first get the contact by its id
  const find_user_by_id = await userManagement.findById(req.params.id);
  if (!find_user_by_id) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // then update the contact
  const update_user = await userManagement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(update_user);
});

const deleteUsers = asyncHandler(async (req, res) => {
  const delete_user = await userManagement.findByIdAndDelete(req.params.id);
  res.status(200).json(delete_user);
});

// Export the getUsers function
module.exports = { getUsers, createUsers, getUser, updateUsers, deleteUsers };
