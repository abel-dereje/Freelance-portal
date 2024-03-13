const asyncHandler = require("express-async-handler");
const jobPost_model  = require('../models/postJob.model');
const tokenHandler = require("../middleware/tokenValidateHandler");
const express = require("express");
const router = express.Router();

router.use(tokenHandler); // Use the token handler middleware for all profile routes


// Define the get Job Posts function using asyncHandler to handle async operations
const getJobPosts = asyncHandler(async (req, res) => {
  try {
    // Retrieve All JOb Posts for the user identified by user_id
    const postJOb = await jobPost_model.find({ user_id: req.user_id });

    // Send a successful response with the retrieved profiles
    res.status(200).json(postJOb);
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const createJobPost = asyncHandler(async (req, res) => {
  try {
    //deconstruct the data from the request
    const { jobTitle, projectSkill, projectScope, projectBudget, postReview } = req.body;

    // Validation check 
    if (!jobTitle || !projectSkill || !projectScope || !projectBudget || !postReview) {
        res.status(400);
       throw new Error(" all fields are required");
    }
    const create_postJob = await jobPost_model.create({
        user_id: req.user_id,
        jobTitle,
        projectSkill,
        projectScope,
        projectBudget,
        postReview        
      });
      
      res.status(201).json(create_postJob);
      console.log("The created new post is:", create_postJob);
  } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
  });

  //Get single order routes by ID
  const getJobPost = asyncHandler(async (req, res) => {
    // get contact using by id
    const find_user_by_id = await jobPost_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Job not found ");
    }
    res.status(200).json(find_user_by_id);
  });

 //Get update message routes by ID
const updateJobPost = asyncHandler(async (req, res) => {
    // first get the contact by its id
    const find_user_by_id = await jobPost_model.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Job not found");
    }
    // then update the skill
    const update_jobPost = await jobPost_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(update_jobPost);
  });

  //Get delete skill routes by ID
const deleteJobPost = asyncHandler(async (req, res) => {
    const delete_jobPost = await jobPost_model.findByIdAndDelete(req.params.id);
    res.status(200).json(delete_jobPost);
  });

  module.exports = { getJobPosts, createJobPost, getJobPost, updateJobPost, deleteJobPost }