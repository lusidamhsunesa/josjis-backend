import db from "../../config/db.config.js";

export const updateStatusPayment = async (orderId, status) => {
  const payment = await db.payments.updateMany({
    where: { order_id: orderId, method: "midtrans" },
    data: {
      status: status,
      paid_at: new Date(),
    },
  });
  return payment;
};
