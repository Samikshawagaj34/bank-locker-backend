const db = require('../db/conn');

// ✅ Admin Register
exports.registerAdmin = (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide name, email, and password" });
  }

  db.query("SELECT * FROM admin WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    db.query("INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err) => {
        if (err) return res.status(500).json({ message: "Registration failed" });
        return res.status(201).json({ message: "Admin registered successfully" });
      }
    );
  });
};

// ✅ Admin Login
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admin WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful", admin: results[0] });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
};
