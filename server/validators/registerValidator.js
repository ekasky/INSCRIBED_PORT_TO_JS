const { check } = require('express-validator');

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

module.exports = { validateRegister };