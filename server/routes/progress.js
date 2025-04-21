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
    // Check if this progress entry already exists
    const existing = await pool.query(
      'SELECT * FROM progress WHERE user_id = $1 AND resource_id = $2',
      [user_id, resource_id]
    );
    console.log("Existing progress:", existing.rows);  // Log existing progress

    if (existing.rows.length > 0) {
      // If the progress already exists, update it
      await pool.query(
        'UPDATE progress SET is_completed = TRUE WHERE user_id = $1 AND resource_id = $2',
        [user_id, resource_id]
      );
      console.log('Progress updated to completed for resource_id:', resource_id);
    } else {
      // If no existing progress entry, insert new entry
      await pool.query(
        'INSERT INTO progress (user_id, resource_id, is_completed) VALUES ($1, $2, TRUE)',
        [user_id, resource_id]
      );
      console.log('Progress marked as completed for resource_id:', resource_id);
    }

    res.status(200).json({ message: 'Progress updated.' });
  } catch (err) {
    console.error('Error in /progress:', err);
    res.status(500).json({ error: 'Error updating progress' });
  }
});

// Get progress for a specific path
router.get('/progress/:pathId', authenticate(), async (req, res) => {
  const { pathId } = req.params;
  const user_id = req.user?.id;

  if (!pathId || !user_id) {
    return res.status(400).json({ error: 'Missing pathId or user_id' });
  }

  try {
    // Fetch all resources for the given path
    const resources = await pool.query(
      'SELECT id FROM resources WHERE path_id = $1',
      [pathId]
    );
    console.log("Resources for pathId:", pathId, resources.rows);  // Log resources

    // Fetch completed resources for the user
    const completedResources = await pool.query(
      'SELECT resource_id FROM progress WHERE user_id = $1 AND is_completed = TRUE AND resource_id IN (SELECT id FROM resources WHERE path_id = $2)',
      [user_id, pathId]
    );
    console.log("Completed resources for user:", completedResources.rows);  // Log completed resources

    // Calculate progress percentage
    const totalResources = resources.rows.length;
    const completedCount = completedResources.rows.length;
    const progress = totalResources > 0 ? (completedCount / totalResources) * 100 : 0;
    console.log("total: ", totalResources, " completed: ", completedCount, " progress: ", progress);

    res.status(200).json({
      progress,
      completedResources: completedResources.rows,
      totalResources
    });

  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

module.exports = router;
