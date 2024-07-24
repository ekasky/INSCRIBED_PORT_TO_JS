const { validationResult }         = require('express-validator');
const User                         = require('../models/User');
const argon2                       = require('argon2'); 
const nodemailer                   = require('nodemailer');
const jwt                          = require('jsonwebtoken');

const registerController = async (req, res) => {

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

        // Extract the input from the request
        const { firstName, lastName, email, username, password } = req.body;

        // Check to see if the username or email is already taken
        const usernameTaken = await User.findOne({ username });
        const emailTaken    = await User.findOne({ email });

        const conflictErrors = [];

        if(usernameTaken) conflictErrors.push({ msg: 'Username is taken' });
        if(emailTaken)    conflictErrors.push({ msg: 'Email is taken' });

        if(conflictErrors.length > 0) {

            return res.status(409).json({
                message: 'Registration unsuccessful',
                errors:  conflictErrors
            });

        }

        // Hash the user's password using argon2 for safe storage
        const hash = await argon2.hash(password);

        // Create a new user
        const user = new User({ firstName, lastName, email, username, password: hash });
        await user.save();

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

        });

        // Return success response
        return res.status(201).json({
            message: 'User successfully created. Please check your inbox to verify your account.'
        });

    }

    catch(error) {

        console.log(`Unexpected registration error: ${error}`);

        return res.status(500).json({
            message: 'Server Error. Please try again later.'
        });

    }

    

}

module.exports = { registerController };