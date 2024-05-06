const asyncHandler = require("express-async-handler");
const profile_model = require("../models/profile.model");


// Define the getUsers function using asyncHandler to handle async operations
const getProfiles = asyncHandler(async (req, res) => {
  try {
    // Retrieve all skills from the database
    const profile = await profile_model.find();

    // Send a successful response with the retrieved users
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route handler to create a profile
const createProfile = asyncHandler(async (req, res) => {
    try {
        const { title, hourlyRate, workHistory, portfolio, skill, testimonial, certification, employmentHistory, otherExperience } = req.body;

        // Validation check
        // if (!title || !hourlyRate) {
        //     return res.status(400).json({ error: "Title and hourly rate fields are required" });
        // }

        // Create profile using user_id attached to request object
        const create_profile = await profile_model.create({
          user_id: req.user_id,
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
  const find_profile_by_id = await profile_model.findById(req.params.id);
  if (!find_profile_by_id) {
    res.status(404);
    throw new Error("User profile not found ");
  }
  res.status(200).json(find_profile_by_id);
});

const updateProfile = asyncHandler(async (req, res) => {
  // first get the contact by its id
  const find_profile_by_id  = await profile_model.findById( req.params.id );
  if (!find_profile_by_id) {
    res.status(404);
    throw new Error("Profile not found");
  }
  // then update the profile
  const update_profile = await profile_model.findByIdAndUpdate(req.params.id, req.body,
    { new: true }
  );
  res.status(200).json(update_profile);
});

const deleteProfile = asyncHandler(async (req, res) => {
  const delete_profile = await profile_model.findByIdAndDelete(req.params.id);
  res.status(200).json(delete_profile);
});

// Export the getUsers function
module.exports = { getProfiles, createProfile, getProfile, updateProfile, deleteProfile };
