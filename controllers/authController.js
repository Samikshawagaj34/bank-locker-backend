const express = require('express');
const { generateToken } = require('../utils/jwt');
const router = express.Router();

router.post('/login', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send('User ID is required');
  }

  const token = generateToken(id);

  res.json({
    message: 'Login successful',
    token: token,
  });
});

module.exports = router;
