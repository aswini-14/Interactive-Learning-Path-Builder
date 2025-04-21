const express = require('express');
const pool = require('./config/database'); // PostgreSQL pool
const authRoutes = require('./routes/auth');
const pathRoutes = require('./routes/paths');
const progressRoutes = require('./routes/progress');
const resourceRoutes = require('./routes/resources'); 
const app = express();
const cors = require('cors');

// Middleware and routes setup
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/admin', require('./routes/admin')); // Make sure this route file exists

// Serve certificates as static files
const path = require('path');
app.use('/certificates', express.static(path.join(__dirname, 'certificates')));

// Database connection check and server start
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Database connected:', res.rows[0]);
    app.listen(5000, () => console.log('Server started on port 5000'));
  }
});
