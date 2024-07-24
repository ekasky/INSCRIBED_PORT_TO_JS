const User = require('../models/User');

const getUserController = async (req, res) => {

    try {

        // Attempt to find the user doc
        const user = await User.findById(req.user.userId)
        .select('-password').select('-loginAttemts')
        .select('-accountLocked').select('-accountVerified')
        .select('-followers').select('-following')
        .select('-posts');

        // Check if the user exisits
        if(!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // Return the user
        return res.status(200).json({
            message: 'User info fetched',
            user
        });

    }

    catch(error) {

        console.log(`An unexpected error occured while getting user: ${error}`);

        return res.status(500).json({
            message: 'Server Error. Please try again later'
        });

    }

};

module.exports = { getUserController };