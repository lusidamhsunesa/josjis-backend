import * as service from "./rating.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const createRating = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;
    const userId = req.user.id;
    const createdRating = await service.createRating(
      userId,
      orderId,
      rating,
      comment,
    );
    return successResponse(
      res,
      "Rating created successfully",
      createdRating,
      201,
    );
  } catch (error) {
    return errorResponse(res, error, "Failed to create rating", null, 500);
  }
};

export const getRatingsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const ratings = await service.getRatingsByUserId(userId);
    return successResponse(res, "Ratings retrieved successfully", ratings);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve ratings", null, 500);
  }
};

export const updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { rating, comment } = req.body;
    const updatedRating = await service.updateRating(ratingId, rating, comment);
    return successResponse(res, "Rating updated successfully", updatedRating);
  } catch (error) {
    return errorResponse(res, error, "Failed to update rating", null, 500);
  }
};

export const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    await service.deleteRating(ratingId);
    return successResponse(res, "Rating deleted successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to delete rating", null, 500);
  }
};
