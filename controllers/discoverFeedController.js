const Post     = require('../models/Post');
const mongoose = require('mongoose');

const discoverFeedController = async (req, res) => {

    try {

        // Pagination settings
        const page  = req.query.page || 1;
        const limit = req.query.limit || 10;

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Find the most recent posts within the limit
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('author')
            .populate('comments.author')
            .skip(skip)
            .limit(parseInt(limit));

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Map posts to include additional details
        const mappedPosts = posts.map((post) => ({
            ...post.toObject(),
            isOwner: post.author._id.toString() === requestingUserId.toString(),
            numberOfLikes: post.likes.length,
            likedByUser: post.likes.some((like) => like.toString() === requestingUserId.toString()),
        }));

        // Return posts with a success message
        return res.status(200).json({
            message: 'Posts retrieved successfully',
            posts: mappedPosts,
            page: parseInt(page),
            limit: parseInt(limit)
        });

    }

    catch(error) {

        console.error(`An unexpected error occurred while retrieving posts: ${error}`);
        
        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { discoverFeedController };