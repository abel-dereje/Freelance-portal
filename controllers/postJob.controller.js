const asyncHandler = require("express-async-handler");
const jobPost_model  = require('../models/postJob.model');

const createJobPost = asyncHandler(async (req, res) => {
    //deconstruct the data from the request
    const {user_id, jobTitle, projectSkill, projectScope, projectBudget, postReview } = req.body;

    // Validation check 
    if (!jobTitle || !projectSkill || !projectScope || !projectBudget || !postReview) {
        res.status(400);
       throw new Error(" all fields are required");
    }
    const create_postJob = await jobPost_model.create({
        user_id,
        jobTitle,
        projectSkill,
        projectScope,
        projectBudget,
        postReview        
      });
  
      res.status(201).json(create_postJob);
      console.log("The created new job is:", req.body);
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

  module.exports = { createJobPost, getJobPost, updateJobPost, deleteJobPost }