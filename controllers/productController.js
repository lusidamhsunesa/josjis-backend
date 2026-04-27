const pool = require('../config/db');

// 1. Ambil semua produk
exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE is_deleted = false ORDER BY category, name');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Tambah produk baru
exports.createProduct = async (req, res) => {
  const { name, description, category, price, img_keys } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, category, price, img_keys) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, category, price, img_keys]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. EDIT PRODUK (Fungsi yang bermasalah)
exports.updateProduct = async (req, res) => {
  const { id } = req.params; // Ambil ID dari URL
  const { name, description, category, price } = req.body; // Ambil data baru dari Body
  try {
    const result = await pool.query(
      `UPDATE products 
       SET name = $1, description = $2, category = $3, price = $4, updated_at = NOW() 
       WHERE id = $5 RETURNING *`,
      [name, description, category, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    res.json({ success: true, message: 'Produk berhasil diperbarui', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update Stok
exports.toggleStock = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [is_active, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hapus Menu (Soft Delete)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Kita set is_deleted jadi true, bukan menghapus barisnya
    const result = await pool.query(
      'UPDATE products SET is_deleted = true, updated_at = NOW() WHERE id = $1 RETURNING *', 
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Menu tidak ditemukan' });
    }

    res.json({ success: true, message: 'Menu berhasil dihapus dari daftar aktif' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};