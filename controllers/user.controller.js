const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// API endpoint to fetch country information
const COUNTRY_API_URL = 'https://restcountries.com/v3.1/name/';

const signupUsers = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, country, role } = req.body;

    if (!email || !password || !firstName || !lastName || !country || !role) {
        return res.status(400).json({ error: "All fields must be filled" });
    }

    const userByEmail = await userModel.findOne({ email });
    if (userByEmail) {
        return res.status(400).json({ error: "User email already exists" });
    }

    try {
        const countryResponse = await axios.get(`${COUNTRY_API_URL}${country}`);
        const countryData = countryResponse.data[0];

        const passwordHash = await bcrypt.hash(password, 13);
        const createUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
            country,
            role: role || 'employer', // Default to 'employee' if no role is provided
        });

        const { role: userRole, ...userWithoutRole } = createUser.toObject();
        return res.status(201).json(userWithoutRole);
    } catch (error) {
        console.error('Error fetching country data:', error);
        return res.status(500).json({ error: 'Failed to fetch country data' });
    }
});

const getUsers = asyncHandler(async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await userModel.find();
  
      // Send a successful response with the retrieved users
      res.status(200).json(users);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  const getUser = asyncHandler(async (req, res) => {
    try {
      // Retrieve all users from the database
      const user = await userModel.findById(req.params.id);
      if (!user) {
        res.status(404);
        throw new Error("User not found ");
      }
  
      // Send a successful response with the retrieved users
      res.status(200).json(user);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //Get update message routes by ID
const updateUser = asyncHandler(async (req, res) => {
    // first get the contact by its id
    const find_user_by_id = await userModel.findById(req.params.id);
    if (!find_user_by_id) {
      res.status(404);
      throw new Error("Job not found");
    }
    // then update the skill
    const update_user = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(update_user);
  });


  const loginUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send('Both email and password are required');
    }
  
    const thisUser = await userModel.findOne({ email });
  
    if (thisUser && (await bcrypt.compare(password, thisUser.password))) {
      const accessToken = jwt.sign(
        {
          thisUser: {
            email: thisUser.email,
            id: thisUser._id, // Ensure the correct user ID is used
            role: thisUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '30m' }
      );
  
      return res.status(200).json({ accessToken, userRole: thisUser.role, userId: thisUser._id });
    } else {
      return res.status(401).send('Invalid Email Address or Password');
    }
  });


const userStatus = asyncHandler(async (req, res) => {
    // res.status(200).json(req.thisUser);
        const { id } = req.params;
        const { status } = req.body;
    
        if (!id || !status) {
            return res.status(400).json({ error: "Both user ID and status are required" });
        }
    
        // Validate if the provided status is valid
        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({ error: "Invalid status provided" });
        }
    
        try {
            // Find the user by ID
            const user = await userModel.findById(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            // Update the user's status
            user.status = status;
            await user.save();
    
            res.status(200).json({ message: "User status updated successfully", user });
        } catch (error) {
            console.error("Error updating user status:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

const logoutUsers = (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};

//Get delete user routes by ID
const deleteUser = asyncHandler(async (req, res) => {
    const delete_user = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(delete_user);
  });
  

module.exports = { signupUsers, getUsers, getUser, updateUser, loginUsers, userStatus, logoutUsers, deleteUser };
