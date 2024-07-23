const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAccountController = async (req, res) => {

    try {

        // Get the verfication jwt from the query params
        const { token } = req.query;

        // Check to make sure the token is present
        if(!token) {

            return res.status(400).json({
                message: 'Verification token is missing'
            });

        }

        // Validate the jwt to ensure it is valid
        const decoded = jwt.verify(token, process.env.VERIFY_EMAIL_SECRET);

        // Get the user document from the id in the decoded token
        const user = await User.findById(decoded.userId);

        // Make sure we found the user account
        if(!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Update the verified state to true
        user.accountVerified = true;
        await user.save();

        // Send a success response letting the user know there account is verified
        return res.status(200).json({
            message: 'Account verified successfully'
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

        // General response error
        console.error('An error occurred while verifying account:', error);

        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { verifyAccountController };