const User = require('../models/User');
const mongoose = require('mongoose');

const unfollowUserController = async (req, res) => {
  
    try {

        // Get the userId from the request parameters
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                message: 'Invalid user ID'
            });

        }

        // Find the user to unfollow
        const userToUnfollow = await User.findById(userId);

        // If user to unfollow is not found, return an error
        if (!userToUnfollow) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Get the requesting user's ID from the authentication middleware
        const requestingUserId = req.user.userId;

        // Check if the user is already not following the user to unfollow
        const alreadyNotFollowing = !userToUnfollow.followers.includes(requestingUserId);

        if (alreadyNotFollowing) {

            return res.status(400).json({
                message: 'You are not following this user'
            });
            
        }

        // Remove the requesting user's ID from the followers array of the user to unfollow
        userToUnfollow.followers = userToUnfollow.followers.filter(
            (followerId) => followerId.toString() !== requestingUserId.toString()
        );

        // Remove the user to unfollow's ID from the following array of the requesting user
        const requestingUser = await User.findById(requestingUserId);
        requestingUser.following = requestingUser.following.filter(
            (followingId) => followingId.toString() !== userId.toString()
        );

        await userToUnfollow.save();
        await requestingUser.save();

        // Return success response
        return res.status(200).json({
            message: 'User unfollowed successfully',
            user: userToUnfollow
        });

    } 
    
    catch (error) {
        console.error(`An unexpected error occurred while unfollowing the user: ${error}`);
        
        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });
    }

};

module.exports = { unfollowUserController };
