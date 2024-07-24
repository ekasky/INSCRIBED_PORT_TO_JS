const User     = require('../models/User');
const mongoose = require('mongoose');

const followUserController = async (req, res) => {

    try {

        // Get the userId from the request parameters
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        // Find the user to follow
        const userToFollow = await User.findById(userId);

        // If user to follow is not found, return an error
        if (!userToFollow) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Check if the user is already following the user to follow
        const alreadyFollowing = userToFollow.followers.includes(requestingUserId);

        if (alreadyFollowing) {
            return res.status(400).json({
                message: 'You are already following this user'
            });
        }

        // Add the requesting user's ID to the followers array of the user to follow
        userToFollow.followers.push(requestingUserId);

        // Add the user to follow's ID to the following array of the requesting user
        const requestingUser = await User.findById(requestingUserId);
        requestingUser.following.push(userId);

        await userToFollow.save();
        await requestingUser.save();

        // Return success response
        return res.status(200).json({
            message: 'User followed successfully',
            user: userToFollow
        });

    }

    catch(error) {

        console.error(`An unexpected error occurred while following the user: ${error}`);
        
        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { followUserController };