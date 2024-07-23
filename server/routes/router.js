const express = require('express');
const mongoose = require('mongoose');

/* Controllers */
const { registerController, validateRegister } = require('../controllers/registerController');

 
const router = express.Router();

router.get('/test', (req, res) => res.status(200).json({ message: "Test" }));
router.post('/register', validateRegister, registerController);

module.exports = { router };