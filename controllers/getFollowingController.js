const User = require('../models/User');
const mongoose = require('mongoose');

const getFollowingController = async (req, res) => {

    try {
        
        // Get the userId from the request parameters
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                message: 'Invalid user ID'
            });

        }

        // Find the user by ID
        const user = await User.findById(userId).populate('following');

        // If user is not found, return an error
        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Return success response with following
        return res.status(200).json({
            message: 'Following retrieved successfully',
            following: user.following
        });

    } 
    
    catch (error) {

        console.error(`An unexpected error occurred while retrieving following: ${error}`);
        
        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { getFollowingController };
