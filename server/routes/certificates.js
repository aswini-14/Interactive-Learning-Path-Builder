const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const PDFDocument = require('pdfkit');
const authenticate = require('../middleware/authenticate');
const path = require('path');

router.get('/:pathId', authenticate(), async (req, res) => {
  const user_id = req.user.id;
  const path_id = req.params.pathId;

  try {
    // Check if user completed all resources
    const total = await pool.query(
      'SELECT COUNT(*) FROM resources WHERE path_id = $1',
      [path_id]
    );
    const completed = await pool.query(
      `SELECT COUNT(*) FROM progress p
       JOIN resources r ON r.id = p.resource_id
       WHERE p.user_id = $1 AND r.path_id = $2 AND p.is_completed = TRUE`,
      [user_id, path_id]
    );

    if (parseInt(total.rows[0].count) !== parseInt(completed.rows[0].count)) {
      return res.status(400).json({ error: 'Path not fully completed' });
    }

    // Insert into certificates if not exists
    const check = await pool.query(
      'SELECT * FROM certificates WHERE user_id = $1 AND path_id = $2',
      [user_id, path_id]
    );

    if (check.rows.length === 0) {
      await pool.query(
        'INSERT INTO certificates (user_id, path_id, issue_date) VALUES ($1, $2, NOW())',
        [user_id, path_id]
      );
    }

    // Generate PDF
    const user = await pool.query('SELECT name FROM users WHERE id = $1', [user_id]);
    const pathData = await pool.query('SELECT title FROM learning_paths WHERE id = $1', [path_id]);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="certificate_${user_id}_${path_id}.pdf"`);
    doc.pipe(res);

    // Add certificate content
    doc.fontSize(22).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`${user.rows[0].name} has successfully completed the learning path:`, {
      align: 'center'
    });
    doc.moveDown();
    doc.fontSize(20).text(`${pathData.rows[0].title}`, { align: 'center', underline: true });
    doc.moveDown(2);
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, { align: 'center' });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Certificate generation failed' });
  }
});

module.exports = router;
