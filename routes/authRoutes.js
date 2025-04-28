const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ API Routes
router.post('/login', authController.loginUser);
router.post('/facelogin', authController.faceLogin);

module.exports = router;
