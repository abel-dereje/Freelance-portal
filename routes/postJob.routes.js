// jobPostRouter.js

const express = require('express');
const jobPostRouter = express.Router();
// const authMiddleware = require('../middleware/tokenValidateHandler');
// const cors = require('cors');


const { createJobPost, getJobPost, getJobPosts, updateJobPost, deleteJobPost } = require('../controllers/postJob.controller.js');

// Use middleware for all routes on this router
// jobPostRouter.use(cors());

// Apply auth middleware to routes that require authentication
jobPostRouter.get('/getJobPosts',  getJobPosts);
jobPostRouter.get('/viewJob/:id', getJobPost);
jobPostRouter.post('/jobs', createJobPost);
jobPostRouter.put('/updateJobPost/:id', updateJobPost);
jobPostRouter.delete('/deleteJobPost/:id', deleteJobPost);

module.exports = jobPostRouter;
