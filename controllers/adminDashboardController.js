const mysql = require('mysql2'); 

// Create MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root@123',  
  database: 'user'     
});

// Users List - Dashboard -To fetch all users, retrieve all user information from the users table
exports.getUsersForDashboard = (req, res) => {
  const query = 'SELECT * FROM users'; 
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send('Server Error');
    } else {
      res.json(result);
    }
  });
};

// Block User -  To block a user, get the user ID from the URL.
exports.blockUser = (req, res) => {
  const { id } = req.params;  // To block a user, get the user ID from the URL.
  const query = `UPDATE users SET status = 'blocked' WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error blocking user:", err);
      res.status(500).send('Server Error');
    } else {
      res.status(200).send('User Blocked');
    }
  });
};

// Unblock User - To unblock a user, get the user ID from the URL.
exports.unblockUser = (req, res) => {
  const { id } = req.params;  
  const query = `UPDATE users SET status = 'active' WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error unblocking user:", err);
      res.status(500).send('Server Error');
    } else {
      res.status(200).send('User Unblocked');
    }
  });
};
