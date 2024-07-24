const mongoose = require("mongoose");


const userModel = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLen: 8
    },

    profilePic: {
        type: String,
        default: ''
    },

    bio: {
        type: String,
        maxlength: 250
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    lastLogin: {
        type: Date,
        default: Date.now
    },

    accountVerified: {
        type: Boolean,
        default: false
    },

    accountLocked: {
        type: Boolean,
        default: false
    },

    loginAttempts: {
        type: Number,
        default: 0
    }


});

const User = mongoose.model('User', userModel);

module.exports = User;