const express = require('express');
const cors = require('cors')
const { signupUsers, loginUsers, getUsers, getUser, updateUser, userStatus, logoutUsers, deleteUser } = require('../controllers/user.controller');
//const tokenHandler = require('../middleware/tokenValidateHandler');

const router = express.Router();
//router.use(tokenHandler); // Use the token handler middleware for all profile routes

router.use(cors());

// Route for user signup (without token middleware)
router.post('/signup', signupUsers);

// Route for user login
router.post('/login', loginUsers);

// Route for user status
 router.put('/status/:id', userStatus);

 //Route for user update    
 router.put('/updateUser/:id', updateUser);

// Route for getting all users
router.get('/users', getUsers);

// Route for getting all users
router.get('/user/:id', getUser);

// Route for user logout
router.post('/logout', logoutUsers);

// router.get('/images/:id', fetchImage);

router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
