const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // For registration
const adminLoginController = require('../controllers/adminLoginController'); // For login

// POST route for admin registration
router.post('/register', adminController.registerAdmin);

// POST route for admin login
router.post('/login', adminLoginController.loginAdmin);

module.exports = router;
