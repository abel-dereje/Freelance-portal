const mongoose = require('mongoose');

const validRoles = ['admin', 'freelancer', 'employer'];
const userStatus = ['active', 'inactive'];

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    country: {
        type: String,
        required: [true, 'Please enter a country'],
    },
    role: {
        type: String,
        enum: validRoles,
        default: 'employer',
    },
    status: {
        type: String,
        enum: userStatus,
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
