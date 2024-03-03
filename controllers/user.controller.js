const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// API endpoint to fetch country information
const COUNTRY_API_URL = 'https://restcountries.com/v3.1/name/';

const signupUsers = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, country, role } = req.body;

    // validation checking whether the user fills all the data fields
    if (!email || !password || !firstName || !lastName || !country) {
        return res.status(400).json({ error: "Full Name, Email, Password, and Country must be filled" });
    }

    const userByEmail = await userModel.findOne({ email });
    if (userByEmail) {
        return res.status(400).json({ error: "User email already exists" });
    }

    // Fetch country information from the API
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
            role, // Including role here for database insertion
        });

        // Exclude the "role" field from the response
        const { role: userRole, ...userWithoutRole } = createUser.toObject(); // Convert to plain JavaScript object
        return res.status(201).json(userWithoutRole);
    } catch (error) {
        console.error('Error fetching country data:', error);
        return res.status(500).json({ error: 'Failed to fetch country data' });
    }
});

const loginUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Both email and password are required');
    }

    let thisUser;

    // Checking if the provided input is an email
    const isEmail = email.includes('@');
    if (isEmail) {
        // If the input is an email, find the user by email
        thisUser = await userModel.findOne({ email });
    } else {
        // If the input is not an email, handle it accordingly
        // Here, you might want to handle cases like username-based authentication
        // You can modify this part according to your application's requirements
        return res.status(400).send('Invalid email format');
    }

    // Check if the user exists and the password matches
    if (thisUser && (await bcrypt.compare(password, thisUser.password))) {
        // If authentication is successful, generate and send access token
        const accessToken = jwt.sign({
            thisUser: {
                email: thisUser.email,
                id: thisUser.id,
                role: thisUser.role, // Include user's role in the token payload
            },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "2m" }
        );

        return res.status(200).send(accessToken);
    } else {
        // If authentication fails, send 401 Unauthorized
        return res.status(401).send("Invalid Email Address or Password");
    }
});

const userStatus = asyncHandler(async (req, res) => {
    res.status(200).json(req.thisUser);
});

const logoutUsers = (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { signupUsers, loginUsers, userStatus, logoutUsers };
