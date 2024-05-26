const asyncHandler = require('express-async-handler');
const skills_model = require('../models/skill.model');

const createSkills = asyncHandler(async (req, res) => {
  const { title, subTitle, category, totalStar, numberStar, address, location, bio, price } = req.body;

  if (!title || !subTitle || !category || !totalStar || !numberStar || !address || !location || !bio || !price) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const create_skills = await skills_model.create({
    user_id: req.user.id,
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

const getSkills = asyncHandler(async (req, res) => {
  try {
    const Skills = await skills_model.find();
    res.status(200).json(Skills);
  } catch (error) {
    console.error("Error retrieving skills:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single skill by ID
const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSkill = asyncHandler(async (req, res) => {
  const find_user_by_id = await skills_model.findById(req.params.id);
  if (!find_user_by_id) {
    res.status(404);
    throw new Error("Skill not found");
  }
  if (find_user_by_id.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user skills");
  }
  const update_user_by_id = await skills_model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(update_user_by_id);
});

const deleteSkill = asyncHandler(async (req, res) => {
  const find_user_by_id = await skills_model.findById(req.params.id);
  if (!find_user_by_id) {
    res.status(404);
    throw new Error("Skill not found");
  }
  if (find_user_by_id.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user skills");
  }
  await find_user_by_id.remove();
  res.status(200).json({ message: `The user skill deleted successfully` });
});

module.exports = { createSkills, getSkill, getSkills, updateSkill, deleteSkill };
