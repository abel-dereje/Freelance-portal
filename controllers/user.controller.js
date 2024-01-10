const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const signupUsers = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      image,
      phone,
      address,
      location,
      bio,
      isSeller,
    } = req.body;

    if (!email || !password) {
      throw new Error("Email and password must be filled");
    }

    const user_Email = await userModel.findOne({ email });
    if (user_Email) {
      return res.status(400).json({ error: "User email is already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 13);
    await userModel.create({
      fullName,
      email,
      password: passwordHash,
      image,
      phone,
      address,
      location,
      bio,
      isSeller,
    });

    res.json({ Message: "User Successfully Registered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password must be provided");
    }
    let thisUser;

    thisUser = await userModel.findOne({ email });

    if (thisUser && (await bcrypt.compare(password, thisUser.password))) {
      const accessToken = jwt.sign(
        {
          thisUser: {
            email: thisUser.email,
            id: thisUser.id
            // phone: thisUser.phone,
            // address: thisUser.address,
            // location: thisUser.location,
            // bio: thisUser.bio
          },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30m" }
      );

      res.status(200).json({ message: "User logged in", accessToken });
    } else {
      res.status(401).json({ error: "Invalid Email Address or Password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userStatus = asyncHandler(async (req, res) => {
  res.json(req.thisUser);
});

const logoutUsers = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { signupUsers, loginUsers, userStatus, logoutUsers };
