const User     = require('../models/User');
const mongoose = require('mongoose');

const deleteUserController = async (req, res) => {

    try {

        // Get the user  id from the request params
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                message: 'Invalid user ID'
            });

        }

        // Check if the authenticated user is deleting their own account
        if (req.user.userId !== userId) {

            return res.status(403).json({
                message: 'You are not authorized to delete this account'
            });

        }

        // Find and delete the user
        const user = await User.findByIdAndDelete(userId);

        // If the user is not found return a user not found error
        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Return a success message
        return res.status(200).json({
            message: 'User deleted successfully'
        });

    }

    catch(error) {

        console.log(`An unexpected error occurred while deleting user: ${error}`);

        return res.status(500).json({
            message: 'Server error. Try again later.'
        });

    }

};

module.exports = { deleteUserController };