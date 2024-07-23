const { validationResult } = require('express-validator');
const User                 = require("../models/User");
const nodemailer           = require('nodemailer');
const jwt                  = require('jsonwebtoken');


const sendPasswordResetEmailController = async (req, res) => {

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

        // Extract the email from thw request body
        const { email } = req.body;

        // Find the account associated with the email address
        const user = await User.findOne({ email });

        // If no user is found, respond with no user found error
        if(!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Set up a nodemailer transporter
        const transporter = nodemailer.createTransport({
            
            host:   process.env.NODEMAILER_HOST,
            port:   process.env.NODEMAILER_PORT,
            secure: process.env.NODEMAILER_SECURE,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }

        });

        // Generate a reset token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email 
            },
            process.env.RESET_PASSWORD_SECRET,
            { 
                expiresIn: '1h' 
            }
        );

        // Create the reset url
        const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        // Create the mail message
        const mailOptions = {
            from:    process.env.NODEMAILER_HOST,
            to:      user.email,
            subject: 'Account Password Reset',
            html: `<p>Please click the link to reset your password: <a href=${url}>Reset Password</a></p>`
        };

        // Send the message
        transporter.sendMail(mailOptions, (error, info) => {

            if(error) {

                return res.status(500).json({
                    message: 'Error sending password reset email. Please try again later.'
                });

            }

            return res.status(200).json({
                message: 'Password reset email sent. Please check your inbox'
            });

        });

    }

    catch(error) {

        console.error('An error occurred while sending password reset email:', error);

        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { sendPasswordResetEmailController };