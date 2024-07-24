const mongoose = require('mongoose');
const Post     = require('../models/Post');

const unlikePostController = async (req, res) => {

    try {

        // Get the postId from the request parameters
        const { postId } = req.params;

        // Validate postId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: 'Invalid post ID',
            });
        }

        // Find the post by ID
        const post = await Post.findById(postId);

        // If post is not found, return an error
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Check if the user has not liked the post
        const notLiked = !post.likes.includes(requestingUserId);

        if (notLiked) {
            return res.status(400).json({
                message: 'Post not liked by the user',
            });
        }

        // Remove the user's ID from the likes array
        post.likes = post.likes.filter((like) => like.toString() !== requestingUserId.toString());
        await post.save();

        // Return success response
        return res.status(200).json({
            message: 'Post unliked successfully',
            post,
        });

    }

    catch(error) {

        console.error(`An unexpected error occurred while unliking the post: ${error}`);

        return res.status(500).json({
            message: 'Server error. Please try again later.',
        });

    }

};

module.exports = { unlikePostController };