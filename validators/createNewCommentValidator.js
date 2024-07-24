const { check } = require('express-validator');

const createNewCommentValidator = [
    check('content')
        .notEmpty().withMessage('Content is required')
        .isLength({ max: 150 }).withMessage('Content cannot exceed 150 characters')
        .escape(),
];

module.exports = { createNewCommentValidator };
