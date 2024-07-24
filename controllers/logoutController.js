const BlacklistedToken = require('../models/BlacklistToken');

const logoutController = async (req, res) => {

    try {

        // Get the token from the authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        // the user is not logged in
        if (!token) {

            return res.status(401).json({
                message: 'User is not logged in'
            });

        }

        // Save the token to the blacklist
        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save();

        // Reuturn success message
        return res.status(200).json({
            message: 'Log out successful'
        });

    }
    
    catch(error) {

        console.error('An error occurred while logging out:', error);

        return res.status(500).json({
            message: 'Server error. Please try again later.'
        });

    }

};

module.exports = { logoutController };