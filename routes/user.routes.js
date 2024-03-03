const express = require('express');
const { signupUsers, loginUsers, userStatus, logoutUsers } = require('../controllers/user.controller');
const tokenHandling = require('../middleware/tokenValidateHandler');

const router = express.Router();

// Route for user signup (without token middleware)
router.post('/signup', signupUsers);

// Route for user login
router.post('/login', loginUsers);

// Route for user status
router.get('/status', tokenHandling, userStatus);

// Route for user logout
router.post('/logout', tokenHandling, logoutUsers);

module.exports = router;
