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
      res.status(400);
      throw new Error("User email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 13);
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
    });

    const foundUser = await userModel.findOne({ email });

    if (foundUser) {
      const accessToken = jwt.sign(
        {
          foundUser: {
            email: foundUser.email,
            id: foundUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30m" }
      );
      res.json({ Message: "User Successfully Registered", accessToken });
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const loginUsers = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password must be provided");
    }

    const foundUser = await userModel.findOne({ email });

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const accessToken = jwt.sign(
        {
          foundUser: {
            email: foundUser.email,
            id: foundUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30m" }
      );

      res.status(200).json({ message: "User logged in", accessToken });
    } else {
      res.status(401);
      throw new Error("Invalid Email Address or Password");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userStatus = asyncHandler(async (req, res) => {
  res.json(req.foundUser);
});

const logoutUsers = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { signupUsers, loginUsers, userStatus, logoutUsers };
