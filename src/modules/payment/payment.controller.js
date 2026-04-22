import * as service from "./payment.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const createPayment = async (req, res) => {
  try {
    const data = req.body;
    const orderId = data.orderId;

    const payment = await service.createPayment(orderId, data);

    return successResponse(res, "Payment created successfully", payment, 201);
  } catch (error) {
    return errorResponse(res, error, "Failed to create payment", null, 500);
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await service.getPaymentById(paymentId);

    return successResponse(res, "Payment retrieved successfully", payment);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve payment", null, 500);
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { status } = req.body;

    const updatedPayment = await service.updatePaymentStatus(paymentId, status);

    return successResponse(
      res,
      "Payment status updated successfully",
      updatedPayment,
    );
  } catch (error) {
    return errorResponse(
      res,
      error,
      "Failed to update payment status",
      null,
      500,
    );
  }
};

export const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    await service.deletePayment(paymentId);

    return successResponse(res, "Payment deleted successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to delete payment", null, 500);
  }
};
