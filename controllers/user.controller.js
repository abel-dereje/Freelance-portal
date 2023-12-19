const express = require('express');
require('../routes/user.routes')

exports.signup= (req, res) => {

    //Destruct the data
    const {userName, email, password} = req.body;

    //Validate the fields whether the user filled all the required fields
    if (!userName || !email || !password) {
        res.status(404)
        throw new Error('all files must be filled')
    }

    res.status(200).json({message:"You have been successfully signed up"})
  }
