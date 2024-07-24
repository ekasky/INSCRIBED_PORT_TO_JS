const { check } = require('express-validator');

const requestVerifyAccountEmailValidator = [

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

];

module.exports = { requestVerifyAccountEmailValidator };