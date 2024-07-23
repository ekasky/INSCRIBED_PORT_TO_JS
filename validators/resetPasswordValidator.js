const { check } = require('express-validator');

const resetPasswordValidator = [

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .escape()

];

module.exports = { resetPasswordValidator };