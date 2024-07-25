const Post = require('../models/Post');
const mongoose = require('mongoose');

const getPostController = async (req, res) => {
    
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

        return res.status(200).json(post);

    } 
    
    catch (error) {

        console.error('Error fetching post: ', error);

        return res.status(500).json({ 
            message: 'Server error. Please try again later.' 
        });

    }
    
};

module.exports = { getPostController };
