const { exec } = require('child_process');
const db = require('../db/conn');
const { sendOTP } = require('../utils/otpService'); // Fast2SMS service import

// ✅ Login using Email + Password
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: "DB error" });
      }

      if (results.length > 0) {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }
  );
};

// ✅ FaceLogin with OTP via Fast2SMS
exports.faceLogin = async (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const storedImagePath = `uploads/${user.photo}`;

    exec(`python utils/faceMatch.py ${storedImagePath}`, async (error, stdout, stderr) => {
      if (error) {
        console.error('Face Match Error:', error);
        return res.status(500).json({ message: "Face match failed" });
      }

      const faceResult = stdout.trim();
      console.log('Face Match Result:', faceResult);

      if (faceResult === "MATCH") {
        const otp = await sendOTP(user.phone);
        if (!otp) {
          return res.status(500).json({ message: "OTP sending failed" });
        }

        return res.status(200).json({
          message: "Face matched. OTP sent",
          otp,
          phone: user.phone,
          timestamp: Date.now() 
        });
      } else {
        return res.status(401).json({ message: "Face not recognized" });
      }
    });
  });
};

// ✅ OTP verification with 5 minute expiry
exports.verifyOTP = (req, res) => {
  const { otp, userOtp, timestamp } = req.body;

  const currentTime = Date.now();
  const expiryTime = 5 * 60 * 1000; // 5 min = 300000 ms

  if (currentTime - timestamp > expiryTime) {
    return res.status(410).json({ message: "OTP expired" });
  }

  if (otp === userOtp) {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(401).json({ message: "Invalid OTP" });
  }
};
