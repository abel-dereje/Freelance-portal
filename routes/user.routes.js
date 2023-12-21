const express = require("express");
const { signup, login, logout } = require("../controllers/user.controller");

const router = express.Router();

// Routes for signup
router.route("/signup").post(signup);

// Routes for login
router.route("/login").post(login);

// Routes for logout
router.route("/logout").post(logout);

module.exports = router;
