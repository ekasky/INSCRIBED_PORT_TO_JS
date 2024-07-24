const { check } = require('express-validator');

const createNewPostValidator = [

    check('content')
        .notEmpty().withMessage('Content is required')
        .isLength({ max: 1000 }).withMessage('Content cannot exceed 1000 characters')
        .trim().escape(),

];

module.exports = { createNewPostValidator };
