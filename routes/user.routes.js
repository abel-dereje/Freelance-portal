const express = require('express')
const { signup } = require('../controllers/user.controller')

const route = express.Router()

// Routs for signup
route.post('/signup', signup);

// Routs for login
route.post('/login', (req, res) => {
    
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
})

// Routs for logout
route.post('/logout', (req, res) => {
  app.status(200).json({message:"This first server is created by express"})
})


module.exports = route;