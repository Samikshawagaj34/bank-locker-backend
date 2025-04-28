const db = require('../db/conn');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('photo');

exports.registerUser = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Photo Upload Error:', err);
            return res.status(400).json({ message: "Photo upload error" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No photo uploaded" });
        }

        const { name, email, phone, password } = req.body;
        const photo = req.file.filename;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user with same email exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (selectErr, selectResult) => {
                if (selectErr) {
                    console.error('Database Error:', selectErr);
                    return res.status(500).json({ message: "Database error" });
                }

                if (selectResult.length > 0) {
                    return res.status(400).json({ message: "User with this email already exists" });
                }

                // If not, then Insert
                db.query(
                    "INSERT INTO users (name, email, phone, password, photo) VALUES (?, ?, ?, ?, ?)",
                    [name, email, phone, password, photo],
                    (insertErr, result) => {
                        if (insertErr) {
                            console.error('Database Insert Error:', insertErr);
                            return res.status(500).json({ message: "Database insert error" });
                        }

                        res.status(201).json({ message: "User registered successfully!" });
                    }
                );
            }
        );
    });
};
