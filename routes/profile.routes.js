const express = require("express");
const cors = require('cors');
const { getProfiles, createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/profile.controller");

const profileRouter = express.Router();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Enable CORS for all routes
profileRouter.use(cors(corsOptions));

// Define routes for managing profile
profileRouter.post('/createProfile', createProfile);
profileRouter.get('/getProfiles', getProfiles);
profileRouter.get('/getProfile/:id', getProfile);
profileRouter.put('/updateProfile/:id', updateProfile);
profileRouter.delete('/deleteProfile/:id', deleteProfile);

// Export the routes
module.exports = profileRouter;
