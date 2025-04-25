const db = require('../db/conn');
const { sendOtp, verifyStoredOtp } = require('../utils/otpService');
const { spawn } = require('child_process');
const path = require('path');

let currentPhone = null; // Temporary storage for session

// POST /api/auth/login
exports.loginWithFace = (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ message: 'Phone number required' });

    db.query('SELECT * FROM users WHERE phone = ?', [phone], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        const storedImage = path.join(__dirname, '..', 'uploads', user.photo);

        // Call Python script for face detection
        const python = spawn('python', ['utils/faceMatch.py', storedImage]);

        python.stdout.on('data', (data) => {
            const output = data.toString().trim();

            if (output === 'MATCH') {
                sendOtp(phone); // Send OTP
                currentPhone = phone;
                res.json({ message: 'Face matched, OTP sent' });
            } else {
                res.status(401).json({ message: 'Face not matched' });
            }
        });

        python.stderr.on('data', (data) => {
            console.error(`Python error: ${data}`);
            res.status(500).json({ message: 'Face detection failed' });
        });
    });
};

// POST /api/auth/verify-otp
exports.verifyOtp = (req, res) => {
    const { otp } = req.body;
    if (!otp || !currentPhone) return res.status(400).json({ message: 'OTP or session missing' });

    const isValid = verifyStoredOtp(currentPhone, otp);
    if (isValid) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid OTP' });
    }
};
