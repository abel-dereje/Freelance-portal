const express = require("express");
const { signupUsers, loginUsers, userStatus, logoutUsers } = require("../controllers/user.controller");
const tokenHandler = require("../middleware/tokenValidateHandler");

const router = express.Router();

// Routes for signup
router.route("/signup").post(signupUsers);

// Routes for login
router.route("/login").post(loginUsers);

// Routes for status
router.route("/status")
.get(tokenHandler,userStatus);

// Routes for logout
router.route("/logout").post(logoutUsers);

module.exports = router;
