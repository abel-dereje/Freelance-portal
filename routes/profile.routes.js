const express = require("express");
const routes = express.Router();
const { getProfiles, createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/profile.controller");
const tokenHandler = require("../middleware/tokenValidateHandler");

const profileRouter = express.Router();


// Define routes for managing users
profileRouter.post('/createProfile', createProfile);
profileRouter.get('/getProfile', getProfiles);
profileRouter.get('/getProfile/:id', getProfile);
profileRouter.put('/getProfile/:id', updateProfile);
profileRouter.delete('/getProfile/:id', deleteProfile);
            

routes.route("/profile/:id").get(getProfile).put(updateProfile).delete(deleteProfile);

// Export the routes
module.exports = profileRouter;