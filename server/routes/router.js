const express = require('express');
const mongoose = require('mongoose');

/* Controllers */
const { registerController } = require('../controllers/registerController');

/* Validators */
const { validateRegister }   = require('../validators/registerValidator');
 
const router = express.Router();

router.get('/test', (req, res) => res.status(200).json({ message: "Test" }));
router.post('/register', validateRegister, registerController);

module.exports = { router };