import * as repository from "./payment.repository.js";
import { createMidtransTransaction } from "../../utils/midtrans.token.js";

export const createPayment = async (orderId, data) => {
  const { method } = data;

  if (!method) {
    throw new Error("Payment method is required");
  }

  const orderDetails = await repository.getOrderDetails(orderId);

  if (!orderDetails) {
    throw new Error("Order not found");
  }

  if (method === "midtrans") {
    const midtransPayment = await createMidtransTransaction({
      orderId: data.orderId,
      grossAmount: orderDetails.total_amount,
      customerName: data.customerName || "guest",
      email: data.email || "guest@guest.com",
      items: orderDetails.order_items.map((item) => ({
        id: item.id,
        price: item.price,
        qty: item.qty,
        name: item.products.name,
      })),
    });

    await repository.createPayment(orderId, orderDetails.total_amount, {
      ...data,
      status: "pending",
      method: "midtrans",
      midtrans_token: midtransPayment.token,
    });

    return midtransPayment;
  }

  if (method === "cash") {
    const payment = await repository.createPayment(
      orderId,
      orderDetails.total_amount,
      {
        ...data,
        status: "unpaid",
        method: "cash",
      },
    );

    return payment;
  }

  throw new Error("Unsupported payment method");
};

export const getPaymentById = async (paymentId) => {
  const payment = await repository.getPaymentById(paymentId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};

export const updatePaymentStatus = async (paymentId, status) => {
  const updatedPayment = await repository.updatePaymentStatus(
    paymentId,
    status,
  );

  if (!updatedPayment) {
    throw new Error("Failed to update payment status");
  }

  return updatedPayment;
};

export const deletePayment = async (paymentId) => {
  const deletedPayment = await repository.deletePayment(paymentId);

  if (!deletedPayment) {
    throw new Error("Failed to delete payment");
  }

  return deletedPayment;
};
