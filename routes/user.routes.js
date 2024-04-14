const express = require('express');
const cors = require('cors')
const { signupUsers, loginUsers, getUsers, userStatus, logoutUsers } = require('../controllers/user.controller');
const tokenHandler = require('../middleware/tokenValidateHandler');

const router = express.Router();
//router.use(tokenHandler); // Use the token handler middleware for all profile routes

router.use(cors());

// Route for user signup (without token middleware)
router.post('/signup', signupUsers);

// Route for user login
router.post('/login', loginUsers);

// Route for user status
 router.get('/status', tokenHandler, userStatus);

// Route for getting all users
router.get('/users', getUsers);

// Route for user logout
router.post('/logout', tokenHandler, logoutUsers);

module.exports = router;
