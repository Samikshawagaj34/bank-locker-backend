const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ API Routes
router.post('/login', authController.loginUser);
router.post('/facelogin', authController.faceLogin);  // Face login + OTP sending
router.post('/verify-otp', authController.verifyOTP); // OTP verify (Fast2SMS)

module.exports = router;
