const express = require('express');
const mongoose = require('mongoose');

/* Controllers */
const { registerController } = require('../controllers/registerController');
const { loginController }    = require('../controllers/loginController');

/* Validators */
const { validateRegister }   = require('../validators/registerValidator');
const { loginValidator }     = require('../validators/loginValidator'); 

const router = express.Router();

router.get('/test', (req, res) => res.status(200).json({ message: "Test" }));
router.post('/register', validateRegister, registerController);
router.post('/login', loginValidator, loginController);

module.exports = { router };