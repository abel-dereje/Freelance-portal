const express = require("express");
const routes = express.Router();
const {
  getUsers,
  createUsers,
  getUser,
  updateUsers,
  deleteUsers,
} = require("../controllers/userManagement.controller");
const tokenHandler = require("../middleware/tokenValidateHandler");

// Define middleware
routes.use(tokenHandler);

// Define routes for managing users
routes.route("/").get(getUsers).post(createUsers);

routes.route("/:id").get(getUser).put(updateUsers).delete(deleteUsers);

// Export the routes
module.exports = routes;
