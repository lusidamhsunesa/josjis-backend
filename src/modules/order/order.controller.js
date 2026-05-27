import * as service from "./order.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import * as validation from "./order.validation.js";

export const createOrder = async (req, res) => {
  try {
    const { error, value } = validation.createOrderSchema.validate(req.body);

    if (error) {
      return errorResponse(res, error, error, null, 422);
    }

    const tableId = value.tableId;
    const order = await service.createOrder(tableId, value);

    return successResponse(res, "Order created successfully", order, 201);
  } catch (error) {
    return errorResponse(res, error, "Failed to create order", null, 500);
  }
};

export const getOrders = async (req, res) => {
  try {
    const { error, value } = validation.paginationSchema.validate(req.query);

    if (error) {
      return errorResponse(res, error, error.details[0].message, null, 422);
    }
    const role = req.user.role;
    const { page, limit, search, sortBy, order } = value;
    const orders = await service.getOrders({
      page,
      limit,
      search,
      sortBy,
      order,
      role,
    });
    return successResponse(res, "Orders retrieved successfully", orders, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to retrieve orders", null, 500);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await service.getOrderById(id);
    if (!order) {
      return errorResponse(res, error, "Order not found", null, 404);
    }
    return successResponse(res, "Order retrieved successfully", order, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to retrieve order", null, 500);
  }
};

export const getOrderByTableId = async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const order = await service.getOrderByTableId(tableId);
    if (!order) {
      return errorResponse(res, error, "Order not found", null, 404);
    }
    return successResponse(res, "Order retrieved successfully", order, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to retrieve order", null, 500);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = validation.updateOrderStatusSchema.validate(
      req.body,
    );

    if (error) {
      return errorResponse(res, error, error.details[0].message, null, 422);
    }

    const updatedOrder = await service.updateOrderStatus(id, value.status);

    if (!updatedOrder) {
      return errorResponse(res, error, "Order not found", null, 404);
    }

    return successResponse(
      res,
      "Order status updated successfully",
      updatedOrder,
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      error,
      "Failed to update order status",
      null,
      500,
    );
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await service.deleteOrder(id);
    if (!deletedOrder) {
      return errorResponse(res, error, "Order not found", null, 404);
    }
    return successResponse(res, "Order deleted successfully", null, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to delete order", null, 500);
  }
};
