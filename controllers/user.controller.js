const express = require('express');
require('../routes/user.routes')
const userModel = require('../models/user.model')

const signup= async(req, res) => {

    //Destruct the data
    const { userName,email,password } = req.body;

    //Validate the fields whether the user filled all the required fields
    try {
        if (!userName || !email || !password) {
            throw new Error('All fields must be filled');
        }
    
        const createUser = await userModel.create({ userName, email, password });
        res.status(200).json({ message: "User created", user: createUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

  module.exports = signup;
