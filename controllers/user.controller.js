const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

let accessToken; // Variable should be moved into the function scope if not used globally.

const signupUsers = asyncHandler(async (req, res) => {
    const { fullName, email, password, image, phone, address, location, bio, isSeller, role } = req.body;

    // validation checking whether the user fills all the data fields
    if (!email || !password || !fullName) {
        throw new Error("Full Name, Email, and Password must be filled");
    }

    const userByEmail = await userModel.findOne({ email });
    if (userByEmail) {
        return res.status(400).json({ error: "User email already exists" });
    } else {
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
            role,
        });

        if (createUser) {
            res.status(201).json(createUser);
        } else {
            res.status(404);
            throw new Error("User data is not valid");
        }
        // Ensure that only one response is sent
        res.json({ message: "User is Successfully Created" });
    }
});

const loginUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Both email and password are required');
    }

    let thisUser;

    const isEmail = email.includes('@');
    if (isEmail) {
        thisUser = await userModel.findOne({ email });
    }

    if (thisUser && (await bcrypt.compare(password, thisUser.password))) {
        accessToken = jwt.sign({
            thisUser: {
                email: thisUser.email,
                id: thisUser.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "2m" }
        );

        res.status(200).send(accessToken);
    } else {
        res.status(401);
        throw new Error("Invalid Email Address or Password");
    }
});

const userStatus = asyncHandler(async (req, res) => {
    res.status(200).json(req.thisUser);
});

const logoutUsers = (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { signupUsers, loginUsers, userStatus, logoutUsers };
