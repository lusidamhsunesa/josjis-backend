import * as service from "./payment.service.js";
import * as validation from "./payment.validation.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import { cache } from "../../utils/cache.js";

const invalidatePaymentsCache = async () => {
  await cache.del("cache:admin:/api/payments*");
  await cache.del("cache:user:/api/payments*");
};

export const createPayment = async (req, res) => {
  invalidatePaymentsCache();
  try {
    const { error, value } = validation.createPaymentSchema.validate(req.body);
    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }
    const data = value;
    const orderId = data.orderId;

    const payment = await service.createPayment(orderId, data);

    return successResponse(res, "Payment created successfully", payment, 201);
  } catch (error) {
    return errorResponse(res, error, "Failed to create payment", null, 500);
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const { error, value } = validation.paginationSchema.validate(req.query);
    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }

    const payments = await service.getAllPayments(value);
    return successResponse(res, "Payments retrieved successfully", payments);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve payments", null, 500);
  }
};

export const getPaymentByOrderId = async (req, res) => {
  try {
    const orderId = req.params.id;
    const payment = await service.getPaymentByOrderId(orderId);

    return successResponse(res, "Payment retrieved successfully", payment);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve payment", null, 500);
  }
};

export const updatePaymentStatus = async (req, res) => {
  invalidatePaymentsCache();
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
  invalidatePaymentsCache();
  try {
    const paymentId = req.params.id;

    await service.deletePayment(paymentId);

    return successResponse(res, "Payment deleted successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to delete payment", null, 500);
  }
};
