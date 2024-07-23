const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {

    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If there's no token, return an unauthorized error
    if (!token) {

        return res.status(401).json({
            message: 'Access token is missing or invalid'
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

module.exports = authenticateToken;
