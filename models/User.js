const db = require('../db/conn'); 

// User registration insert function
const createUser = (userData, callback) => {
  const sql = 'INSERT INTO users (name, email, password, phone, photo) VALUES (?, ?, ?, ?, ?)';
  const values = [userData.name, userData.email, userData.password, userData.phone, userData.photo];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    return callback(null, result);
  });
};

module.exports = {
  createUser
};
