const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticate = require('../middleware/authenticate');

// Add a resource to a learning path
router.post('/', authenticate(), async (req, res) => {
  const { path_id, type, title, url, description, estimated_time, resource_order } = req.body;

  console.log('POST /resources hit with:', { path_id, type, title, url, description, estimated_time, resource_order });

  // Check if all required fields are provided
  if (!path_id || !type || !title || !url || !description || !estimated_time || !resource_order) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO resources (path_id, type, url, resource_order, title, description, estimated_time)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [path_id, type, url, resource_order, title, description, estimated_time]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding resource' });
  }
});

// Get all resources for a path
router.get('/:path_id', authenticate(), async (req, res) => {
  const pathId = req.params.path_id;

  // Check if path_id is provided
  if (!pathId) {
    return res.status(400).json({ error: 'Missing path_id parameter' });
  }

  console.log('GET /resources/:path_id hit with path_id:', pathId);

  try {
    const result = await pool.query(
      'SELECT * FROM resources WHERE path_id = $1 ORDER BY resource_order ASC',
      [pathId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No resources found for this path' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ error: 'Error fetching resources' });
  }
});

module.exports = router;
