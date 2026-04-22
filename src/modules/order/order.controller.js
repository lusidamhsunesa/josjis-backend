import * as service from "./order.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orderData = req.body;
//     const order = await service.createOrder(userId, orderData);
//     return successResponse(res, "Order created successfully", order, 201);
//   } catch (error) {
//     return errorResponse(res, error, "Failed to create order", null, 500);
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const tableId = req.body.tableId;

    const order = await service.createOrder(tableId, req.body);

    return successResponse(res, "Order created successfully", order, 201);
  } catch (error) {
    return errorResponse(res, error, "Failed to create order", null, 500);
  }
};
