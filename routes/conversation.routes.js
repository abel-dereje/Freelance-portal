const express = require('express');
const cors = require('cors');

// const tokenHandler = require('../middleware/tokenValidateHandler');
const { createConversation, getConversations, getConversation, updateConversation, deleteConversation } = require('../controllers/conversations.controller.js');

const routerConversation = express.Router();

// Use middleware for all routes on this router
//routerConversation.use(tokenHandler);
routerConversation.use(cors());


// Define routes
routerConversation.route("/conversations").post(createConversation);
routerConversation.route("/getConversations").get(getConversations);

routerConversation.route("/conversations/:id").get(getConversation).put(updateConversation).delete(deleteConversation);

module.exports = routerConversation;