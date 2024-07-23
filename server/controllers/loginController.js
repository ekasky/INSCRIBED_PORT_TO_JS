const { validationResult }         = require('express-validator');

const loginController = async (req, res) => {

    try {

        const errors = validationResult(req);

        res.status(200).send('LOGIN');

    }

    catch(error) {

        res.status(500).send('ERROR');

    }

};

module.exports = { loginController };