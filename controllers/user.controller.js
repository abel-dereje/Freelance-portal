const express = require('express');
require('../routes/user.routes')
const userModel = require('../models/user.model')

const signup= async(req, res) => {

    //Destruct the data
    const {userName, email, password} = req.body;

    //Validate the fields whether the user filled all the required fields
    if (!userName || !email || !password) {
        res.status(404)
        throw new Error('all files must be filled')
    }
    else {
        const createUser = await userModel.create({userName,email,password});
    }

    res.status(200).json("Create User", createUser)
  }
  module.exports = signup;
