const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables from .env file

// Use the DATABASE_URL environment variable provided by Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Render sets DATABASE_URL for you in production
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,  // Enable SSL only in production
});

module.exports = pool;

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB Connection Error:', err);
  } else {
    console.log('DB Connected:', res.rows);
  }
});
