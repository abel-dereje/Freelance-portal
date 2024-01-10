const express = require('express');
const { createSkills, getSkill, updateSkill, deleteSkill } = require('../controllers/skills.controller');
const tokenHandler = require('../middleware/tokenValidateHandler');

const routerSkill = express.Router();

// Use middleware for all routes on this router
routerSkill.use(tokenHandler);

// Define routes
routerSkill.route("/skills").post(createSkills);
// .get(getSkills)
routerSkill.route("/skill/:id").get(getSkill).put(updateSkill).delete(deleteSkill);

module.exports = routerSkill;