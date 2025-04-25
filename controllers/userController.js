const db = require('../db/conn');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('photo');

exports.registerUser = (req, res) => {
    upload(req, res, function (err) {
        if (err) return res.status(400).send("Photo upload error");

        if (!req.file) return res.status(400).send("No photo uploaded");

        const { name, email, phone, password } = req.body;
        const photo = req.file.filename;

        db.query("INSERT INTO users (name, email, phone, password, photo) VALUES (?, ?, ?, ?, ?)",
            [name, email, phone, password, photo],
            (err, result) => {
                if (err) return res.status(500).send("DB error");
                res.status(201).send("User registered");
            }
        );
    });
};
