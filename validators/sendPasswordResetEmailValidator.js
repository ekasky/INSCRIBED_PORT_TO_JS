const { check } = require('express-validator');

const sendPasswordResetEmailValidator = [

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

];

module.exports = { sendPasswordResetEmailValidator };