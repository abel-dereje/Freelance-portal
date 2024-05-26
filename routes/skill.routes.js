const express = require('express');
const { createSkills, getSkill, getSkills, updateSkill, deleteSkill } = require('../controllers/skills.controller');
const  verifyJWT  = require('../middleware/tokenValidateHandler');
const routerSkill = express.Router();

routerSkill.post('/skills', createSkills);
routerSkill.get('/skill/:id', verifyJWT, getSkill);
routerSkill.get('/getSkills', verifyJWT, getSkills);
routerSkill.put('/updateSkill/:id', verifyJWT, updateSkill);
routerSkill.delete('/skill/:id', verifyJWT, deleteSkill);

module.exports = routerSkill;
