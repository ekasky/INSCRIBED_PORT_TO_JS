const express  = require('express');
const mongoose = require('mongoose');

/* Controllers */
const { registerController }                  = require('../controllers/registerController');
const { loginController }                     = require('../controllers/loginController');
const { requestVerifyAccountEmailController } = require('../controllers/requestVerifyAccountEmailController');
const { verifyAccountController }             = require('../controllers/verifyAccountController');

/* Validators */
const { validateRegister }                   = require('../validators/registerValidator');
const { loginValidator }                     = require('../validators/loginValidator'); 
const { requestVerifyAccountEmailValidator } = require('../validators/requestVerifyAccountEmailValidator');


const router = express.Router();

router.get('/test', (req, res) => res.status(200).json({ message: "Test" }));

/* Auth Routes */
router.post('/register', validateRegister, registerController);
router.post('/login', loginValidator, loginController);
router.post('/send-verify-email', requestVerifyAccountEmailValidator, requestVerifyAccountEmailController);
router.get('/verify-account', verifyAccountController);

module.exports = { router };