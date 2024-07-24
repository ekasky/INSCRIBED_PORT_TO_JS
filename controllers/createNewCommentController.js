const { validationResult } = require('express-validator');
const mongoose             = require('mongoose');
const Post                 = require('../models/Post');


const createNewCommentController = async (req, res) => {

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

        // Get the postId from the request parameters
        const { postId } = req.params;

        // Validate postId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: 'Invalid post ID'
            });
        }

        // Find the post by ID
        const post = await Post.findById(postId);

        // If post is not found, return an error
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        // Extract the comment data from the request body
        const { content } = req.body;

        // Create a new comment
        const newComment = {
            content,
            author: req.user.userId,
        };

        // Add the comment to the post's comments array
        post.comments.push(newComment);
        await post.save();

        // Return success response
        return res.status(201).json({
            message: 'Comment created successfully',
            comment: newComment,
        });

    }

    catch(error) {

        console.error(`An unexpected error occurred while creating a comment: ${error}`);
        
        return res.status(500).json({
            message: 'Server error. Please try again later.',
        });

    }

};

module.exports = { createNewCommentController };