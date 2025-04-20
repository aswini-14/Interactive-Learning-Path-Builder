const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Import Op from sequelize
const Path = require('../models/Path');
const authenticate = require('../middleware/authenticate');

// Get public or user’s own paths
router.get('/', authenticate(['learner', 'creator', 'admin']), async (req, res) => {
  try {
    const paths = await Path.findAll({
      where: {
        [Op.or]: [  // Use Op.or instead of Path.sequelize.Op.or
          { is_public: true },
          { creator_id: req.user.id },
        ],
      },
    });
    res.json(paths);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching paths' });
  }
});

// Get a specific learning path by ID
router.get('/:id', authenticate(['learner', 'creator', 'admin']), async (req, res) => {
    try {
      const path = await Path.findByPk(req.params.id);
      if (!path) return res.status(404).json({ message: 'Learning path not found' });
  
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
    const newPath = await Path.create({
      title,
      description,
      is_public,
      creator_id: req.user.id,
    });
    res.status(201).json(newPath);
  } catch (err) {
    res.status(500).json({ message: 'Error creating path' });
  }
});

module.exports = router;
