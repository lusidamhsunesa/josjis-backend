import db from "../../config/db.config.js";

export const createPayment = async (orderId, amount, data) => {
  const payment = await db.payments.create({
    data: {
      order_id: orderId,
      amount: amount,
      method: data.method,
      status: data.status,
      midtrans_token: data.midtrans_token ?? "",
      paid_at: data.paidAt,
    },
  });
  return payment;
};

export const getPayments = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  order = "desc",
  role = "user",
  status = null,
  method = null,
}) => {
  const skip = (page - 1) * limit;

  const whereCondition = {
    ...(status && { status }),
    ...(method && { method }),
  };

  const payments = await db.payments.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: order,
    },
    skip,
    take: limit,
  });

  const total = await db.payments.count({
    where: whereCondition,
  });

  return {
    payments,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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

export const getPaymentByOrderId = async (orderId) => {
  return await db.payments.findMany({
    where: { order_id: orderId },
  });
};

export const updatePaymentStatus = async (paymentId, status) => {
  const payment = await db.payments.findFirst({
    where: {
      id: paymentId,
      method: "cash",
    },
  });

  if (!payment) {
    throw new Error("Payment data with method cash is unavailable");
  }

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
