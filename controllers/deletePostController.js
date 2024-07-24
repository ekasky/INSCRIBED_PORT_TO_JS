const mongoose = require('mongoose');
const Post     = require('../models/Post');
const User     = require('../models/User');

const deletePostController = async (req, res) => {

    try {

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

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Check if the requesting user is the owner of the post
        if (post.author.toString() !== requestingUserId) {

            return res.status(403).json({
                message: 'You are not authorized to delete this post'
            });

        }

        // Remove the post from the user's posts array
        await User.findByIdAndUpdate(requestingUserId, { $pull: { posts: postId } });

        // Delete the post
        await post.deleteOne();

        // Return success response
        return res.status(200).json({
            message: 'Post deleted successfully'
        });

    }

    catch(error) {

        console.error(`An unexpected error occurred while deleting the post: ${error}`);

        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { deletePostController };