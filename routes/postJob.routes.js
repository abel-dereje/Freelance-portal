const express = require('express');

const tokenHandler = require('../middleware/tokenValidateHandler.js');
const { createJobPost, getJobPost, updateJobPost, deleteJobPost } = require('../controllers/postJob.controller.js');


const jobPostRouter = express.Router();


// Define routes for managing profile
jobPostRouter.post('/createJobPost', createJobPost);
// jobPostRouter.get('/getJobPost', getJobPost);
jobPostRouter.get('/getJobPost/:id', getJobPost);
jobPostRouter.put('/updateJobPost/:id', updateJobPost);
jobPostRouter.delete('/deleteJobPost/:id', deleteJobPost);

module.exports = jobPostRouter;