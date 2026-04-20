const pool = require('../config/db');

exports.getTables = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tables WHERE is_deleted = false ORDER BY name ASC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTable = async (req, res) => {
  const { name, capacity } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tables (name, capacity) VALUES ($1, $2) RETURNING *`,
      [name, capacity]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};