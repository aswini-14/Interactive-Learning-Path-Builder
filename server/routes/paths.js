const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // PostgreSQL pool
const authenticate = require('../middleware/authenticate');

// Get public or user’s own paths
router.get('/', authenticate(['learner', 'creator', 'admin']), async (req, res) => {
  try {
    const query = `
      SELECT * FROM learning_paths
      WHERE is_public = true OR creator_id = $1
    `;
    const result = await pool.query(query, [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching paths' });
  }
});

// Get a specific learning path by ID
router.get('/:id', authenticate(['learner', 'creator', 'admin']), async (req, res) => {
  try {
    const query = 'SELECT * FROM learning_paths WHERE id = $1';
    const result = await pool.query(query, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Learning path not found' });
    }

    const path = result.rows[0];

    // Check if the path is public or if the user is the creator/admin
    if (!path.is_public && path.creator_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(path);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching the learning path' });
  }
});

// Create a new path (creators only)
router.post('/', authenticate(['creator', 'admin']), async (req, res) => {
  const { title, description, is_public } = req.body;
  try {
    const query = `
      INSERT INTO learning_paths (title, description, is_public, creator_id)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await pool.query(query, [title, description, is_public, req.user.id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating path' });
  }
});

module.exports = router;
