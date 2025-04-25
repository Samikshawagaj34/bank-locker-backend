const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login with face detection
router.post('/login', authController.loginWithFace);

// Verify OTP
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;
