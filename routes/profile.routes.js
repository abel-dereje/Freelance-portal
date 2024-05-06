const express = require('express');
const profileRouter = express.Router();


// const authMiddleware = require('../middleware/tokenValidateHandler');
// const cors = require('cors');

const { getProfiles, createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/profile.controller");

// Use middleware for all routes on this router
// profileRouter.use(cors());

// Define routes for managing profile
profileRouter.route("/createProfile").post(createProfile);
profileRouter.route("/profiles").get(getProfiles);

profileRouter.route("/getProfile/:id").get(getProfile);
profileRouter.route("/updateProfile/:id").put(updateProfile);
profileRouter.route("/deleteProfile/:id").delete(deleteProfile);

// Export the routes
module.exports = profileRouter;
