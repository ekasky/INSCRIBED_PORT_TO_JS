const jwt                  = require('jsonwebtoken');
const User                 = require('../models/User');
const { validationResult } = require('express-validator');
const argon2               = require('argon2');

const resetPasswordController = async (req, res) => {

    try {

        // Get the verfication jwt from the query params
        const { token } = req.query;

        // Check to make sure the token is present
        if(!token) {

            return res.status(400).json({
                message: 'Verification token is missing'
            });

        }

        // Validate the json web token
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

        // Find the user associated with the userID from the token
        const user = await User.findById(decoded.userId);

        // If a user is not found respond with a not found error
        if(!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Check for validation errors
        const errors = validationResult(req);

        // Respond with a input validation error message, along with the errors
        if(!errors.isEmpty()) {

                return res.status(400).json({
                    message: 'Input validation error',
                    errors:  errors.array()
                });

        } 

        // Extract the password from the request body
        const { password } = req.body;

        // Hash the password using argon2
        const hash = await argon2.hash(password);

        // Update the password in the users record
        user.password = hash;
        user.loginAttempts = 0;
        user.accountLocked = false;
        await user.save();

        // Return success response message
        return res.status(200).json({
            message: 'Password successfully reset'
        });


    }

    catch(error) {

        // Catch json web token errors

        if(error instanceof jwt.JsonWebTokenError) {

            return res.status(400).json({
                message: 'Invalid verification token. Please request a new token'
            });

        }

        if(error instanceof jwt.TokenExpiredError) {

            return res.status(400).json({
                message: 'Validation token expired. Please request a new one'
            });

        }

        // General error

        console.log(`An unexpected error occured while resetting password: ${error}`);

        return res.status(500).json({
            message: 'Server Error. Please try again later'
        });

    }

};

module.exports = { resetPasswordController };