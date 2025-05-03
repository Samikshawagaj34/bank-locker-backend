const express = require('express');
const router = express.Router();
const adminDashboardController = require('../controllers/adminDashboardController');  // Importing the new controller

// Get all users for dashboard
router.get('/users', adminDashboardController.getUsersForDashboard);

// Block a user
router.post('/block/:id', adminDashboardController.blockUser);

// Unblock a user
router.post('/unblock/:id', adminDashboardController.unblockUser);

module.exports = router;
