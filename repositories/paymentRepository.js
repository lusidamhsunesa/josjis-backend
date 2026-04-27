const pool = require('../config/db');

// Mengambil detail order termasuk item untuk Midtrans
exports.getOrderDetails = async (orderId) => {
  const result = await pool.query(`
    SELECT o.*, 
    (SELECT json_agg(items) FROM (
       SELECT oi.*, p.name FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = o.id
    ) items) as order_items
    FROM orders o WHERE o.id = $1
  `, [orderId]);
  return result.rows[0];
};

exports.createPayment = async (orderId, amount, data) => {
  const result = await pool.query(
    `INSERT INTO payments (order_id, amount, method, status, midtrans_token, paid_at) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [orderId, amount, data.method, data.status, data.midtrans_token || null, data.paid_at || null]
  );
  return result.rows[0];
};