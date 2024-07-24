const mongoose = require('mongoose');
const Post     = require('../models/Post');

const likePostController = async (req, res) => {

    try {

        // Get the userId from the request parameters
        const { postId } = req.params;

        // Validate userId
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

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Check if the user has already liked the post
        const alreadyLiked = post.likes.includes(requestingUserId);

        if (alreadyLiked) {

            return res.status(400).json({
                message: 'Post already liked by the user'
            });

        }

        // Add the user's ID to the likes array
        post.likes.push(requestingUserId);
        await post.save();

        // Return success response
        return res.status(200).json({
            message: 'Post liked successfully',
            post
        });

    }

    catch(error) {

        console.error(`An unexpected error occurred while liking the post: ${error}`);
        
        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { likePostController };