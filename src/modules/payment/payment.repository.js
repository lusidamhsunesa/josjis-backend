import db from "../../config/db.config.js";

export const createPayment = async (orderId, amount, data) => {
  const payment = await db.payments.create({
    data: {
      order_id: orderId,
      amount: amount,
      method: data.method,
      status: data.status,
      midtrans_token: data.midtransToken ?? "",
      paid_at: data.paidAt,
    },
  });
  return payment;
};

export const getOrderDetails = async (orderId) => {
  return await db.orders.findUnique({
    where: { id: orderId },
    include: {
      order_items: {
        select: {
          id: true,
          price: true,
          qty: true,
          products: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const getPaymentById = async (paymentId) => {
  return await db.payments.findUnique({
    where: { id: paymentId },
  });
};

export const updatePaymentStatus = async (paymentId, status) => {
  return await db.payments.update({
    where: { id: paymentId },
    data: { status },
  });
};

export const deletePayment = async (paymentId) => {
  return await db.payments.delete({
    where: { id: paymentId },
  });
};
