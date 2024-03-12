const asyncHandler = require("express-async-handler");
const userProfile = require("../models/profile.model");
const tokenHandler = require("../middleware/tokenValidateHandler");
const express = require("express");
const router = express.Router();

router.use(tokenHandler); // Use the token handler middleware for all profile routes


// Define the getUsers function using asyncHandler to handle async operations
const getProfiles = asyncHandler(async (req, res) => {
  try {
    // Retrieve profiles for the user identified by user_id
    const profiles = await userProfile.find({ user_id: req.user_id });

    // Send a successful response with the retrieved profiles
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route handler to create a profile
const createProfile = asyncHandler(async (req, res) => {
    try {
        const { title, hourlyRate, workHistory, portfolio, skill, testimonial, certification, employmentHistory, otherExperience } = req.body;

        // Validation check
        if (!title || !hourlyRate) {
            return res.status(400).json({ error: "Title and hourly rate fields are required" });
        }

        // Create profile using user_id attached to request object
        const create_profile = await userProfile.create({
            user_id: req.user_id, // Using user_id attached to the request object
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
        console.log("The created new profile is:", create_profile);
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
  const find_profile_by_id  = await userProfile.findById( req.params.id );
  if (!find_profile_by_id) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // then update the profile
  const update_profile = await userProfile.findByIdAndUpdate(req.params.id, req.body,
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
