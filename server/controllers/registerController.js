const { validationResult }         = require('express-validator');
const User                         = require('../models/User');
const argon2                       = require('argon2'); 

const registerController = async (req, res) => {

    try {

        // Check for validation errors
        const errors = validationResult(req);

        // Throw error if input is invalid
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

        // Send verification email

        // Return success response
        return res.status(201).json({
            message: 'User successfully created'
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