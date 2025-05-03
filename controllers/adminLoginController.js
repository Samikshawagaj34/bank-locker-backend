const db = require('../db/conn'); // Import database connection

// ✅ Admin Login
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password" });
  }

  // Check the credentials in the database
  db.query("SELECT * FROM admin WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      // Login successful
      return res.status(200).json({ message: "Login successful", admin: results[0] });
    } else {
      // Invalid email or password
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
};
