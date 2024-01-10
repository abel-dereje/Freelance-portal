const asyncHandler = require("express-async-handler");
const skills_model = require('../models/skill.model');

const createSkills = asyncHandler(async (req, res) => {
  //deconstruct the data from the request
  const { userID, title, subTitle, category, totalStar, numberStar, address, location, bio, price } = req.body;

    // Validation check 
    if (!userID || !title || !subTitle || !category || !totalStar || !numberStar || !address || !location || !bio || !price) {
       res.status(400);
       throw new Error(" all fields are required");
    }
    // if email  is Exist 
  const userId= await skills_model.findOne({userID});
  if(userId){
      res.status(400);
      throw new Error("User ID is Already Existed");
  }

    const create_skills = await skills_model.create({
      userID,
      title,
      subTitle,
      category,
      totalStar,
      numberStar,
      address,
      location,
      bio,
      price
    });

    res.status(201).json(create_skills);
    console.log("The Created New Skill is:", req.body);
});

// Get all skills routes
// const getSkills = asyncHandler(async (req, res) => {
//   // Assuming req.find_user_by_id retrieves the user ID
//   const userId = req.find_user_by_id; // Assuming this retrieves the user ID properly

//   // Retrieve all skills associated with the user ID from the database
//   const skills = await skills_model.find({ user_id: userId }); // Use userId in the query

//   // Send a successful response with the retrieved skills
//   res.status(200).json(skills);
// });


//Get single skill routes by ID
const getSkill = asyncHandler(async (req, res) => {
  // get contact using by id
  const find_user_by_id = await skills_model.findById(req.params.id);
  if (!find_user_by_id) {
    res.status(404);
    throw new Error("User not found ");
  }
  res.status(200).json(find_user_by_id);
});


//Get update skill routes by ID
const updateSkill = asyncHandler(async (req, res) => {
  // first get the contact by its id
  const find_user_by_id = await skills_model.findById(req.params.id);
  if (!find_user_by_id) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // then update the skill
  const update_skill = await skills_model.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(update_skill);
});


//Get delete skill routes by ID
const deleteSkill = asyncHandler(async (req, res) => {
  const delete_skill = await skills_model.findByIdAndDelete(req.params.id);
  res.status(200).json(delete_skill);
});

module.exports = { createSkills, getSkill, updateSkill, deleteSkill };
