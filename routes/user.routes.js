const express = require('express')
const  signup  = require('../controllers/user.controller')

const router = express.Router()

// Routs for signup, login and logout
// route.route('/signup', signup);
router.route('/signup')
  .post(signup);

// Routs for login
// route.post('/login', (req, res) => {
    
//   let username = req.body.username;
//   let password = req.body.password;
//   res.send(`Username: ${username} Password: ${password}`);
// })

// Routs for logout
// route.post('/logout', (req, res) => {
//   app.status(200).json({message:"This first server is created by express"})
// })


module.exports = router;