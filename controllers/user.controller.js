const express = require("express");
require("../routes/user.routes");
const userModel = require("../models/user.model");

const signup = async (req, res) => {
  //Destruct the data
  const { userName, email, password } = req.body;

  //Validate the fields whether the user filled all the required fields
  try {
    if (!userName || !email || !password) {
      throw new Error("All fields must be filled");
    }

    const createUser = await userModel.create({ userName, email, password });
    res.status(200).json({ message: "User created", user: createUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      // Check if email and password exist in the request body
      if (!email || !password) {
        throw new Error("Invalid email or password");
      }
  
      // Assuming loginUser represents the retrieved user data after validation
      const foundUser = await userModel.findOne({ email });
  
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }
  
      res.status(200).json({ message: "User logged in", user: foundUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const logout = (req, res) => {
  
    // You can clear the token stored on the client-side upon logout
    res.clearCookie('authToken'); // Clear the JWT token from cookies
    
    res.status(200).json({ message: 'User logged out successfully' });
  };
  
  module.exports = { signup, login,logout };