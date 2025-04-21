const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const pool = require('../config/database');

// Track progress: mark a resource as completed
router.post('/', authenticate(), async (req, res) => {
  const { resource_id } = req.body;
  const user_id = req.user?.id;

  console.log('POST /progress hit with:', { resource_id, user_id });

  if (!resource_id || !user_id) {
    return res.status(400).json({ error: 'Missing resource_id or user_id' });
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM progress WHERE user_id = $1 AND resource_id = $2',
      [user_id, resource_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'UPDATE progress SET is_completed = TRUE WHERE user_id = $1 AND resource_id = $2',
        [user_id, resource_id]
      );
    } else {
      await pool.query(
        'INSERT INTO progress (user_id, resource_id, is_completed) VALUES ($1, $2, TRUE)',
        [user_id, resource_id]
      );
    }

    res.status(200).json({ message: 'Progress updated.' });
  } catch (err) {
    console.error('Error in /progress:', err);
    res.status(500).json({ error: 'Error updating progress' });
  }
});
// routes/progress.js (Add this part)

router.get('/completed/:pathId', authenticate(), async (req, res) => {
  const { pathId } = req.params;
  const user_id = req.user?.id;

  if (!pathId || !user_id) {
    return res.status(400).json({ error: 'Missing pathId or user_id' });
  }

  try {
    const completedResources = await pool.query(
      'SELECT resource_id FROM progress WHERE user_id = $1 AND is_completed = TRUE AND resource_id IN (SELECT id FROM resources WHERE path_id = $2)',
      [user_id, pathId]
    );
    res.status(200).json({ completedResources: completedResources.rows });
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Error fetching progress' });
  }
});


module.exports = router;
