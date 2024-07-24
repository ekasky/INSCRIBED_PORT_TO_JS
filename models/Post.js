const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
        maxlength: 150
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
        maxlength: 1000
    },

    image: {
        type: String,
        default: ''
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    comments: [commentSchema],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;