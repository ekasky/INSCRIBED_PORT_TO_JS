const { validationResult } = require('express-validator');
const Post                 = require('../models/Post');
const User                 = require('../models/User');

const createNewPostController = async (req, res) => {

    try {

        // Check for validation errors
        const errors = validationResult(req);

        // Respond with an input validation error message, along with the errors
        if (!errors.isEmpty()) {

            return res.status(400).json({
                message: 'Input validation error',
                errors: errors.array(),
            });

        }

        // Extract the post data from the request body
        const { content, image } = req.body;

        // Create a new post
        const newPost = new Post({
            content,
            image,
            author: req.user.userId,
        });

        // Save the post to the database
        await newPost.save();

        // Push the id to the users doc
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        user.posts.push(newPost._id);
        await user.save();

        // Return success response
        return res.status(201).json({
            message: 'Post created successfully',
            post: newPost,
        });

    }

    catch(error) {

        console.error(`An unexpected error occurred while creating a post: ${error}`);

        return res.status(500).json({
            message: 'Server error. Please try again later.',
        });

    }

};

module.exports = { createNewPostController };