const asyncHandler = require("express-async-handler");
const Order  = require('../models/postJob.model');

// Define the get Job Posts function using asyncHandler to handle async operations
const getJobPosts = asyncHandler(async (req, res) => {
  try {
    // Retrieve All JOb Posts for the user identified by user_id
    const postJOb = await Order.find();

    // Send a successful response with the retrieved profiles
    res.status(200).json(postJOb);
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Assuming this is a route handler function
const createJobPost = asyncHandler(async (req, res) => {
  try {
    // Check if user is authenticated
    // if (!req.user) {
    //   return res.status(401).json({ error: "Unauthorized access. Please log in." });
    // }

    const { jobTitle, projectSkill, projectScope, projectBudget, projectCategory } = req.body;

    // Validate if required fields are provided
    if (!jobTitle || !projectScope || !projectBudget) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new job post
    const create_postJob = await Order.create({
      user_id: req.user_id, // Use req.user._id as the user ID
      jobTitle,
      projectSkill,
      projectScope,
      projectBudget,
      projectCategory
    });

    // Respond with created job post
    res.status(201).json(create_postJob);
    console.log("The created new post is:", create_postJob);
  } catch (error) {
    console.error("Error creating post:", error);
    // Handle validation errors
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

  //Get single order routes by ID
  const getJobPost = asyncHandler(async (req, res) => {
    // get contact using by id
    const find_user_by_id = await Order.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Job not found ");
    }
    res.status(200).json(find_user_by_id);
  });

 //Get update message routes by ID
const updateJobPost = asyncHandler(async (req, res) => {
    // first get the contact by its id
    const find_user_by_id = await Order.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Job not found");
    }
    // then update the skill
    const update_jobPost = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(update_jobPost);
  });

  //delete job routes by ID
const deleteJobPost = asyncHandler(async (req, res) => {
    const delete_jobPost = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(delete_jobPost);
  });

  module.exports = { getJobPosts, createJobPost, getJobPost, updateJobPost, deleteJobPost }