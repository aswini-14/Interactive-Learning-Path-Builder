const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ilp_builder',
  password: process.env.DB_PASS || 'password',
  port: 5432,
});

module.exports = pool;

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB Connection Error:', err);
  } else {
    console.log('DB Connected:', res.rows);
  }
});
