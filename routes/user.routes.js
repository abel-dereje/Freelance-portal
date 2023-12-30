const express = require("express");
const { signupUsers, loginUsers, logoutUsers } = require("../controllers/user.controller");

const router = express.Router();

// Routes for signup
router.route("/signup").post(signupUsers);

// Routes for login
router.route("/login").post(loginUsers);

// Routes for logout
router.route("/logout").post(logoutUsers);

module.exports = router;
