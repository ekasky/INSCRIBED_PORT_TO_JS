const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

const getPostWithCommentsController = async (req, res) => {
    
    try {

        const { postId } = req.params;

        // Validate postId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        // Find the post by ID
        const post = await Post.findById(postId).populate('author');
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Find comments for the post
        const comments = await Comment.find({ post: postId }).populate('author').sort({ createdAt: -1 });

        return res.status(200).json({ post, comments });

    } 
    
    catch (error) {

        console.error('Error fetching post with comments:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });

    }
    
};

module.exports = { getPostWithCommentsController };
