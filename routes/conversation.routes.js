const express = require('express');

const tokenHandler = require('../middleware/tokenValidateHandler');
const { createConversation, getConversation, updateConversation, deleteConversation } = require('../controllers/conversations.controller.js');

const routerConversation = express.Router();

// Use middleware for all routes on this router
routerConversation.use(tokenHandler);


// Define routes
routerConversation.route("/conversations").post(createConversation);

routerConversation.route("/conversations/:id").get(getConversation).put(updateConversation).delete(deleteConversation);

module.exports = routerConversation;