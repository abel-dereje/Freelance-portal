// Importing the error handler module
const asyncHandler = require("express-async-handler");
// Importing the model module
const userProfile = require("../models/profile.model");

// Define the getUsers function using asyncHandler to handle async operations
const getProfiles = asyncHandler(async (req, res) => {
  // Retrieve all users from the database
  const users = await userProfile.find({ user_id: req.find_user_by_id });
  // Send a successful response with the retrieved users
  res.status(200).json(users);
});

const createProfile = asyncHandler(async (req, res) => {
  //deconstruct the data from the request
  const {user_id, title, hourlyRate, workHistory, portfolio, skill, testimonial, certification, employmentHistory, otherExperience } =
    req.body;
  // validation check
  if (!title || !hourlyRate ) {
    res.status(400);
    throw new Error(" title and hourly rate fields are required or Mandatory");
  }
  // // if email  is Exist 
  // const user_email= await userManagement.findOne({email});
  // if(user_email){
  //     res.status(400);
  //     throw new Error("User Email is Exist in the database");
  // }
  // if the all fields are required then we need to create a const that access the model of  the database
  const create_profile = await userProfile.create({
    user_id,
    title,
    hourlyRate,
    workHistory,
    portfolio,
    skill,
    testimonial,
    certification,
    employmentHistory,
    otherExperience,
  });
  res.status(201).json(create_profile);
  console.log("The created new profile is:", req.body);
});

const getProfile = asyncHandler(async (req, res) => {
  // get contact using by id
  const find_profile_by_id = await userProfile.findById(req.params.id);
  if (!find_profile_by_id) {
    res.status(404);
    throw new Error("User not found ");
  }
  res.status(200).json(find_profile_by_id);
});

const updateProfile = asyncHandler(async (req, res) => {
  // first get the contact by its id
  const find_profile_by_id = await userProfile.findById(req.params.id);
  if (!find_profile_by_id) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // then update the contact
  const update_profile = await userProfile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(update_profile);
});

const deleteProfile = asyncHandler(async (req, res) => {
  const delete_profile = await userProfile.findByIdAndDelete(req.params.id);
  res.status(200).json(delete_profile);
});

// Export the getUsers function
module.exports = { getProfiles, createProfile, getProfile, updateProfile, deleteProfile };
