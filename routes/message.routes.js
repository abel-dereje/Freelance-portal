const express = require('express');

const tokenHandler = require('../middleware/tokenValidateHandler');
const { createMessage, getMessage, updateMessage, deleteMessage } = require('../controllers/messages.controller.js');

const routerMessage = express.Router();

// Use middleware for all routes on this router
routerMessage.use(tokenHandler);


// Define routes
routerMessage.route("/messages").post(createMessage);

routerMessage.route("/messages/:id").get(getMessage).put(updateMessage).delete(deleteMessage);

module.exports = routerMessage;