const pool = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Cari user berdasarkan email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email tidak terdaftar' });
    }

    const user = result.rows[0];

    // 2. Cek password (sementara pakai teks biasa dulu)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Password salah' });
    }

    // 3. Login sukses
    res.json({
      success: true,
      message: 'Login berhasil!',
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};