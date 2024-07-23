const { validationResult }         = require('express-validator');
const argon2                       = require('argon2'); 
const User                         = require('../models/User');
const jwt                          = require('jsonwebtoken');

const loginController = async (req, res) => {

    try {

        const errors = validationResult(req);

        // Throw error if input is invalid
        if(!errors.isEmpty()) {

            return res.status(400).json({
                message: 'Input validation error',
                errors:  errors.array()
            });

        }

        // Extract the username and password from the body
        const { username, password } = req.body;

        // Attempt to find a User document in the database
        const user = await User.findOne({ username });

        // If no user is found respond with a incorrect login crednetials
        if(!user) {

            console.log('User not found while logging in');

            return res.status(401).json({
                message: 'Incorrect Username or Password. Try Again.'
            });

        }

        // Check to see if the password provided matches the password on file
        const passwordsMatch = await argon2.verify(user.password, password);

        // If the passwords do not match do the following
        //     1. Increment the number of login attempts by 1
        //     2. Check to see if the user login attempts is greater than 5, if so lock the account
        //     3. Respond with invalid username and password
        if(!passwordsMatch) {

            user.loginAttempts++;

            if(user.loginAttempts >= 5) {
                user.accountLocked = true;
            }

            await user.save();

            return res.status(403).json({
                message: 'Too many login attempts. Please reset your password'
            });

        }

        // Check if the user is verified
        if(!user.accountVerified) {

            return res.status(401).json({
                message: 'Please verify your account before logging in'
            });

        }

        // Generate a JWT for the user to be authenticated
        const token = jwt.sign(
        {

            userId: user.id,
            username: user.username

        }, 
        process.env.LOGIN_SECRET, 
        {

            expiresIn: '1h'

        });

        // Resets the login attempts and updates the login time
        user.loginAttempts = 0;
        user.lastLogin = Date.now;
        await user.save;

        return res.status(200).json({
            message: 'Login Successful',
            token
        });

    }

    catch(error) {

        console.log(`An unexpected error occured while logging in: ${error}`);

        return res.status(500).json({
            message: 'Server Error. Please try again later.'
        });

    }

};

module.exports = { loginController };