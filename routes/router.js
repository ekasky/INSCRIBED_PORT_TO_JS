const express  = require('express');
const mongoose = require('mongoose');

/* Middlewares */
const { isAuthenticated } = require('../middleware/isAuthenticated');

/* Controllers */
const { registerController }                  = require('../controllers/registerController');
const { loginController }                     = require('../controllers/loginController');
const { requestVerifyAccountEmailController } = require('../controllers/requestVerifyAccountEmailController');
const { verifyAccountController }             = require('../controllers/verifyAccountController');
const { sendPasswordResetEmailController }    = require('../controllers/sendPasswordResetEmailController');
const { resetPasswordController }             = require('../controllers/resetPasswordController');
const { updateUserInfoController }            = require('../controllers/updateUserInfoController');
const { deleteUserController }                = require('../controllers/deleteUserController');
const { createNewPostController }             = require('../controllers/createNewPostController');

/* Validators */
const { validateRegister }                   = require('../validators/registerValidator');
const { loginValidator }                     = require('../validators/loginValidator'); 
const { requestVerifyAccountEmailValidator } = require('../validators/requestVerifyAccountEmailValidator');
const { sendPasswordResetEmailValidator }    = require('../validators/sendPasswordResetEmailValidator');
const { resetPasswordValidator }             = require('../validators/resetPasswordValidator');
const { updateUserInfoValidator }            = require('../validators/updateUserInfoValidator');
const { createNewPostValidator }             = require('../validators/createNewPostValidator');



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
router.delete('/user/delete/:userId', isAuthenticated, deleteUserController);
router.post('/post', isAuthenticated, createNewPostValidator, createNewPostController);

module.exports = { router };