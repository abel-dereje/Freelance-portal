const express = require("express");
const routes = express.Router();
const { getProfiles, createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/profile.controller");
const tokenHandler = require("../middleware/tokenValidateHandler");

const profileRouter = express.Router();


// Define routes for managing profile
profileRouter.post('/createProfile', createProfile);
profileRouter.get('/getProfile', getProfiles);
profileRouter.get('/getProfile/:id', getProfile);
profileRouter.put('/updateProfile/:id', updateProfile);
profileRouter.delete('/deleteProfile/:id', deleteProfile);
            

routes.route("/profile/:id").get(getProfile).put(updateProfile).delete(deleteProfile);

// Export the routes
module.exports = profileRouter;