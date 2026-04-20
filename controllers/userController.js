const pool = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, is_active FROM users WHERE is_deleted = false');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Ingat: Di *real project*, password JANGAN disimpan plain text. Gunakan bcrypt!
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
      [name, email, password, role || 'admin']
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Soft delete: kita hanya mengubah status is_deleted menjadi true
    await pool.query(`UPDATE users SET is_deleted = true, is_active = false WHERE id = $1`, [id]);
    res.json({ success: true, message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};