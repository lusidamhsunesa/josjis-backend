const service = require('../services/paymentService');

exports.createPayment = async (req, res) => {
  try {
    const { orderId, method } = req.body;
    const payment = await service.createPayment(orderId, { method });
    res.status(201).json({ success: true, message: "Payment created successfully", data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};