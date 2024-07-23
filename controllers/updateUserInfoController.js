const User                 = require("../models/User");
const { validationResult } = require('express-validator');
const argon2               = require('argon2');
const mongoose             = require('mongoose');

const updateUserInfoController = async (req, res) => {

    try {

        // Check for validation errors
        const errors = validationResult(req);

        // Respond with a input validation error message, along with the errors
        if(!errors.isEmpty()) {

                return res.status(400).json({
                    message: 'Input validation error',
                    errors:  errors.array()
                });

        }

        // Get the user id from the request params
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        // Get the updates from the request body
        const { firstName, lastName, username, password, newPassword } = req.body;

        // Find the user from the id provided in the request
        const user = await User.findById(userId);

        // If the user is not found return a user not found error
        if(!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // If the username is being updated check if it is avaliable
        if(username && username !== user.username) {

            const usernameTaken = await User.findOne({ username });

            // If it is taken respond with a conflict error
            if(usernameTaken) {

                return res.status(409).json({
                    message: 'Username is taken'
                });

            }

        }

        // If newPassword is provided, make sure the existing password is correct
        if (newPassword) {

            // Ensure the current password is provided
            if (!password) {
                return res.status(400).json({
                    message: 'Current password is required to set a new password'
                });
            }

            const passwordsMatch = await argon2.verify(user.password, password);
            if (!passwordsMatch) {

                return res.status(401).json({
                    message: 'Current password is incorrect'
                });

            }

            user.password = await argon2.hash(newPassword);

        }

        // Update user fields
        if(firstName !== undefined) user.firstName = firstName;
        if(lastName !== undefined) user.lastName = lastName;
        if(username !== undefined) user.username = username;

        // Return a success message
        return res.status(200).json({
            message: 'User updated successfully',
            user
        });

        

    }

    catch(error) {

        console.log(`An unexpected error occured while updating user info: ${error}`);

        return res.status(500).json({
            message: 'Server error. Try again later.'
        });

    }

};

module.exports = { updateUserInfoController };