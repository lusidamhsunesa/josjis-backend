const pool = require('../config/db');

// 1. Fungsi buat order baru
exports.createOrder = async (req, res) => {
  const { table_id, items, order_type } = req.body; 
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const total_amount = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const orderResult = await client.query(
      `INSERT INTO orders (table_id, status, total_amount, order_type) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [order_type === 'TAKEAWAY' ? null : table_id, 'PENDING', total_amount, order_type]
    );
    const newOrder = orderResult.rows[0];
    for (let item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, qty, price, subtotal, notes) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [newOrder.id, item.product_id, item.qty, item.price, item.qty * item.price, item.notes]
      );
    }
    await client.query('COMMIT');
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, message: error.message });
  } finally { client.release(); }
};

// 2. Fungsi lihat semua order
exports.getOrders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE is_deleted = false ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Fungsi UPDATE STATUS (PENTING!)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  try {
    const result = await pool.query(
      `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order tidak ditemukan' });
    }
    res.json({ success: true, message: `Status diperbarui jadi ${status}`, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};