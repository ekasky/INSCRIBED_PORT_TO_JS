const express  = require('express');
const mongoose = require('mongoose');

/* Controllers */
const { registerController }                  = require('../controllers/registerController');
const { loginController }                     = require('../controllers/loginController');
const { requestVerifyAccountEmailController } = require('../controllers/requestVerifyAccountEmailController');
const { verifyAccountController }             = require('../controllers/verifyAccountController');
const { sendPasswordResetEmailController }    = require('../controllers/sendPasswordResetEmailController');
const { resetPasswordController }             = require('../controllers/resetPasswordController');
const { updateUserInfoController }            = require('../controllers/updateUserInfoController');

/* Validators */
const { validateRegister }                   = require('../validators/registerValidator');
const { loginValidator }                     = require('../validators/loginValidator'); 
const { requestVerifyAccountEmailValidator } = require('../validators/requestVerifyAccountEmailValidator');
const { sendPasswordResetEmailValidator }    = require('../validators/sendPasswordResetEmailValidator');
const { resetPasswordValidator }             = require('../validators/resetPasswordValidator');
const { updateUserInfoValidator }            = require('../validators/updateUserInfoValidator');



const router = express.Router();

router.get('/test', (req, res) => res.status(200).json({ message: "Test" }));

/* Auth Routes */
router.post('/register', validateRegister, registerController);
router.post('/login', loginValidator, loginController);
router.post('/send-verify-email', requestVerifyAccountEmailValidator, requestVerifyAccountEmailController);
router.get('/verify-account', verifyAccountController);
router.post('/send-password-reset-email', sendPasswordResetEmailValidator, sendPasswordResetEmailController)
router.post('/reset-password', resetPasswordValidator, resetPasswordController);
router.patch('/user/update/:userId', updateUserInfoValidator, updateUserInfoController);

module.exports = { router };