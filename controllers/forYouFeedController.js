const Post     = require('../models/Post');
const User     = require('../models/User');
const mongoose = require('mongoose');

const forYouFeedController = async (req, res) => {

    try {

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Validate requestingUserId
        if (!mongoose.Types.ObjectId.isValid(requestingUserId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        // Find the user to get their following list
        const user = await User.findById(requestingUserId).populate('following');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Get the list of user IDs the requesting user is following
        const followingIds = user.following.map(followedUser => followedUser._id);

        // Pagination settings
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        // Find all posts by the users being followed within the limit
        const posts = await Post.find({ author: { $in: followingIds } })
            .populate('author')
            .populate('comments.author')
            .skip(skip)
            .limit(parseInt(limit));

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

        console.error(`An unexpected error occurred while retrieving the "For You" feed: ${error}`);

        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { forYouFeedController };