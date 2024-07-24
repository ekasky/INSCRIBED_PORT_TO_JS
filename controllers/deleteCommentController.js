const mongoose = require('mongoose');
const Post     = require('../models/Post');

const deleteCommentController = async (req, res) => {

    try {

        // Get the postId and commentId from the request parameters
        const { postId, commentId } = req.params;

        // Validate postId and commentId
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            
            return res.status(400).json({
                message: 'Invalid post ID or comment ID',
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

        // Find the index of the comment by ID within the post's comments
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);

        // If comment is not found, return an error
        if (commentIndex === -1) {

            return res.status(404).json({
                message: 'Comment not found',
            });

        }

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Check if the requesting user is the author of the comment or the post
        if (post.comments[commentIndex].author.toString() !== requestingUserId.toString() && post.author.toString() !== requestingUserId.toString()) {
            
            return res.status(403).json({
                message: 'You are not authorized to delete this comment',
            });
            
        }

        // Remove the comment using splice
        post.comments.splice(commentIndex, 1);
        await post.save();

        // Return success response
        return res.status(200).json({
            message: 'Comment deleted successfully',
            post,
        });
    }

    catch(error) {

        console.error(`An unexpected error occurred while deleting the comment: ${error}`);

        return res.status(500).json({
            message: 'Server error. Please try again later.',
        });

    }

};

module.exports = { deleteCommentController };