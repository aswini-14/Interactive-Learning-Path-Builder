// routes/admin.js
const express = require('express');
const pool = require('../config/database'); // PostgreSQL pool
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Get all users
router.get('/users', authenticate(['admin']), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user role (admin, creator, learner)
router.put('/users/:id/role', authenticate(['admin']), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
      [role, id]
    );
    if (result.rows.length > 0) {
      res.json({ message: `User role updated to ${role}` });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Delete user
router.delete('/users/:id', authenticate(['admin']), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
