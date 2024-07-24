const { check } = require('express-validator');

const updateUserInfoValidator = [
    
    check('firstName')
        .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters')
        .escape()
        .optional(),

    check('lastName')
        .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters')
        .escape()
        .optional(),

    check('username')
        .isLength({ max: 30 }).withMessage('Username cannot exceed 30 characters')
        .escape()
        .optional(),

    check('password')
        .isLength({ max: 64 }).withMessage('Password cannot exceed 64 characters')
        .escape()
        .optional(),

    check('newPassword')
        .isLength({ min: 8, max: 64 }).withMessage('Password must be between 8-64 characters')
        .escape()
        .optional()
];

module.exports = { updateUserInfoValidator };