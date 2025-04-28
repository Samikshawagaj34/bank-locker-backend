const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register API
router.post('/register', userController.registerUser);

module.exports = router;
