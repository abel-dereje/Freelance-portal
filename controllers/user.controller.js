const express = require("express");
const bcrypt = require('bcrypt');
require("../routes/user.routes");
const userModel = require("../models/user.model");

const signupUsers = async (req, res) => {
  //Destruct the data
  const { fullName, email, password, image, phone, address, location, bio, isSeller } = req.body;

  //Validate the fields whether the user filled all the required fields
    if ( !email || !password) {
      throw new Error("Email and password must be filled");
    }

    const user_Email = await userModel.findOne({email});
    if(user_Email) {
        res.status(400);
        throw new Error ("User email is already Exists");
    }
    else{
      const passwordHash = await bcrypt.hash(password,13);
      // console.log("The Hash Password is: " + passwordHash);

      const createUser = await userModel.create({
        fullName,
        email,
        password: passwordHash,
        image,
        phone,
        address,
        location,
        bio,
        isSeller,        
    })
    // if (createUser){
    //   res.status(201).json({_id: createUser.id, email: createUser.email});
    // }
    // else{
    //   res.status(404);
    //   throw new Error("User data is not valid");
    // }
      res.json({Message: "User Successfully Registered"});
    }
};

const loginUsers = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if email and password exist in the request body
    if (!email || !password) {
      throw new Error("email and password must be provided");
    }

    // Assuming loginUser represents the retrieved user data after validation
    const foundUser = await userModel.findOne({ email });

    if (!foundUser && (await bcrypt.compare(password, foundUser.password !== password))) {
      throw new Error("Invalid email or password");
    }

    res.status(200).json({ message: "User logged in", user: foundUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUsers = (req, res) => {
  // You can clear the token stored on the client-side upon logout
  res.clearCookie("authToken"); // Clear the JWT token from cookies

  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { signupUsers, loginUsers, logoutUsers };
