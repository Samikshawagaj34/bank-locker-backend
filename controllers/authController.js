const { exec } = require('child_process');
const { sendOTP } = require('../utils/otpService');
const db = require('../db/conn');

// ✅ Login API (Email + Password Check)
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
};

// ✅ FaceLogin API (Face Detection + OTP Send)
exports.faceLogin = (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const storedImagePath = `uploads/${user.photo}`;

    exec(`python utils/faceMatch.py ${storedImagePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Face Match Error:', error);
        return res.status(500).json({ message: "Face match failed" });
      }

      const faceResult = stdout.trim();
      console.log('Face Match Result:', faceResult);

      if (faceResult === "MATCH") {
        const otp = sendOTP(user.phone);
        console.log(`OTP sent to ${user.phone}: ${otp}`);
        return res.status(200).json({ message: "Face matched. OTP sent", otp: otp, phone: user.phone });
      } else {
        return res.status(401).json({ message: "Face not recognized" });
      }
    });
  });
};
