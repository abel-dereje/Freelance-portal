const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: 'string',
        required: [true, "Please enter a full name"],
    },
    email:{
        type: 'string',
        required: [true, "Please enter an email"],
    },
    password:{
        type: 'string',
        required: [true, "Please enter a phone number"],
    },
},
{
    timestamp: true,
})

module.exports = mongoose.model('My freelance portal', userSchema)