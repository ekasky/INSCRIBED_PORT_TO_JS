const { check, validationResult }  = require('express-validator');
const { User }                     = require('../models/User');
const argon2                       = require('argon2'); 

const validateRegister = [
    check('firstName')
        .notEmpty().withMessage('First name is required')
        .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters')
        .escape(),

    check('lastName')
        .notEmpty().withMessage('Last name is required')
        .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters')
        .escape(),

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    check('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ max: 30 }).withMessage('Username cannot exceed 30 characters')
        .escape(),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .escape()
];

const registerController = async (req, res) => {

    try {

        // Check for validation errors
        const errors = validateRegister(req);

        // Throw error if input is invalid
        if(!errors.isEmpty()) {

                return res.status('400').json({
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

module.exports = { registerController, validateRegister };