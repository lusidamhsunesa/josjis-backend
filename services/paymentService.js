const repository = require('../repositories/paymentRepository');
const pool = require('../config/db');

exports.createPayment = async (orderId, data) => {
  const { method } = data;
  if (!method) throw new Error("Payment method is required");

  const orderDetails = await repository.getOrderDetails(orderId);
  if (!orderDetails) throw new Error("Order not found");

  if (method === "cash") {
    const payment = await repository.createPayment(orderId, orderDetails.total_amount, {
      method: "cash",
      status: "success",
      paid_at: new Date()
    });

    // Update status order jadi PAID secara otomatis
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['PAID', orderId]);
    return payment;
  }

  // Jika midtrans, status awal adalah pending (membutuhkan integrasi Midtrans SDK)
  if (method === "midtrans") {
    return await repository.createPayment(orderId, orderDetails.total_amount, {
      method: "midtrans",
      status: "pending",
      midtrans_token: "SIMULASI_TOKEN_123"
    });
  }

  throw new Error("Unsupported payment method");
};