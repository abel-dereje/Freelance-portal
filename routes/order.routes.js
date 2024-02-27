const express = require('express');

const tokenHandler = require('../middleware/tokenValidateHandler');
const { createOrder, getOrder, updateOrder, deleteOrder } = require('../controllers/orders.controller.js');

const routerOrder = express.Router();

// Use middleware for all routes on this router
routerOrder.use(tokenHandler);


// Define routes
routerOrder.route("/orders").post(createOrder);

routerOrder.route("/orders/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = routerOrder;