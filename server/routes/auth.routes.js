const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Get all Posts
router.route('/login').post(AuthController.login);
router.route('/signup').post(...AuthController.signup)

module.exports = router;