const express = require("express");
const { signup, login } = require("../controllers/user.controller");

const router = express.Router();

// Routes for signup
router.route("/signup").post(signup);

// Routes for login
router.route("/login").post(login);

module.exports = router;
