// const express = require('express');
// const cors = require('cors');
// const { signupUsers, loginUsers, getUsers, getUser, updateUser, userStatus, logoutUsers, deleteUser } = require('../controllers/user.controller');
// const { authenticate, authorize } = require('../middleware/tokenValidateHandler');

// const router = express.Router();

// router.use(cors());

// router.post('/signup', signupUsers);
// router.post('/login', loginUsers);

// router.use(authenticate);

// router.put('/status/:id', authorize(['admin']), userStatus);
// router.put('/updateUser/:id', authorize(['admin', 'freelancer', 'employer']), updateUser);
// router.get('/users', authorize(['admin']), getUsers);
// router.get('/user/:id', authorize(['admin', 'freelancer', 'employer']), getUser);
// router.delete('/deleteUser/:id', authorize(['admin']), deleteUser);
// router.post('/logout', logoutUsers);

// module.exports = router;
const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/tokenValidateHandler');
const cors = require('cors');
const { signupUsers, loginUsers, getUsers, getUser, updateUser, userStatus, logoutUsers, deleteUser } = require('../controllers/user.controller');

const userModel = require('../models/user.model');


router.use(cors());

router.post('/signup', signupUsers);
router.post('/login', loginUsers);

// Example of a protected route
router.get('/users', verifyJWT, async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/user/:id', verifyJWT, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
router.put('/status/:id', verifyJWT, userStatus);
router.put('/updateUser/:id', verifyJWT, updateUser);
router.delete('/deleteUser/:id', verifyJWT, deleteUser);
router.post('/logout', logoutUsers);

module.exports = router;

