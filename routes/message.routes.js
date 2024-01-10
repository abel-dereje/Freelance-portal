const express = require('express');

const tokenHandler = require('../middleware/tokenValidateHandler');
const { createMessage } = require('../controllers/messages.controller.js');

const routerMessage = express.Router();

// Use middleware for all routes on this router
routerMessage.use(tokenHandler);


// Define routes
routerMessage.route("/messages").post(createMessage);

module.exports = routerMessage;