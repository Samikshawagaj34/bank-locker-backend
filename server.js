const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: 'http://127.0.0.1:5502',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

// ✅ Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminauthRoutes = require('./routes/adminauthRoutes'); // ✅ Added admin routes
const adminDashboardRoutes = require('./routes/admindashboardRoutes'); // ✅ Added admin dashboard routes

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminauthRoutes); // ✅ Use admin auth route
app.use('/api/admin/dashboard', adminDashboardRoutes); // ✅ Use admin dashboard routes

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
