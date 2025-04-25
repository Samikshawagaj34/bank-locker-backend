const jwt = require('jsonwebtoken');

function generateToken(userId) {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = { generateToken };
