const { validationResult }  = require('express-validator');
const User                  = require("../models/User");
const nodemailer            = require('nodemailer');
const jwt                   = require('jsonwebtoken');


const requestVerifyAccountEmailController = async (req, res) => {

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

        // Extract the email from the request body
        const { email } = req.body;

        // Attempt to find a account associated with that email address
        const user = await User.findOne({ email });

        // If no user is found send response tellong them to sign up
        if(!user) {

            return res.status(404).json({
                message: 'Account not found. Please register first'
            });

        }

        // Do not send a email if the account is already verified
        if(user.accountVerified) {

            return res.status(400).json({
                message: 'Account already verified'
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

        // Generate a verification token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email 
            },
            process.env.VERIFY_EMAIL_SECRET,
            { 
                expiresIn: '1h' 
            }
        );

        // Create the verify url
        const url = `${process.env.FRONTEND_URL}/api/verify-account?token=${token}`;
        
        // Create the mail message
        const mailOptions = {
            from:    process.env.NODEMAILER_HOST,
            to:      user.email,
            subject: 'Account Verification',
            html: `<p>Please click the link to verify your account <a href=${url}>Verify Account</a></p>`
        };

        // Send the message
        transporter.sendMail(mailOptions, (error, info) => {

            if(error) {

                return res.status(500).json({
                    message: 'Error sending verification email. Please try again later.'
                });

            }

            return res.status(200).json({
                message: 'Verifiction email sent. Please check your inbox'
            });

        });

    }

    catch(error) {

        console.error('An error occurred while requesting email verification:', error);

        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }


};

module.exports = { requestVerifyAccountEmailController };