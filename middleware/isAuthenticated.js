const jwt              = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistToken');

const isAuthenticated = async (req, res, next) => {

    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If there's no token, return an unauthorized error
    if (!token) {

        return res.status(401).json({
            message: 'Access token is missing or invalid'
        });

    }

    // Check to see if the token is blacklisted
    const blacklistedToken = await BlacklistedToken.findOne({ token });

    if (blacklistedToken) {
        return res.status(401).json({
            message: 'Login token is invalid'
        });
    }

    // Verify the token
    jwt.verify(token, process.env.LOGIN_SECRET, (err, user) => {

        if (err) {
            return res.status(403).json({
                message: 'Invalid or expired token'
            });
        }

        // Save the user details to the request object for later use
        req.user = user;
        next();
        
    });
};

module.exports = { isAuthenticated };
