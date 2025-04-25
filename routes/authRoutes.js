const express = require('express');
const router = express.Router();

// Sample POST route
router.post('/login', (req, res) => {
  // Authentication logic
  res.send('Login route');
});

module.exports = router;
