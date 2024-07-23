const { check } = require('express-validator');

const loginValidator = [

    check('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ max: 30 }).withMessage('Username cannot exceed 30 characters')
        .escape(),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ max: 64 }).withMessage('Password cannot exceed 64 characters in length')
        .escape()


];

module.exports = { loginValidator };