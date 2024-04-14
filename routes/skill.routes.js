const express = require('express');
const cors = require('cors');

const { createSkills, getSkill, getSkills, updateSkill, deleteSkill } = require('../controllers/skills.controller');

const routerSkill = express.Router();

// Use middleware for all routes on this router
routerSkill.use(cors());

// Define routes
routerSkill.route("/skills").post(createSkills);
routerSkill.route("/skill/:id").get(getSkill).put(updateSkill).delete(deleteSkill);
routerSkill.route("/getSkills").get(getSkills);

module.exports = routerSkill;
