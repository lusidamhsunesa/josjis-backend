import * as service from "./rating.service.js";
import * as validation from "./rating.validation.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const createRating = async (req, res) => {
  try {
    const { error, value } = validation.createRatingSchema.validate(req.body);
    if (error) {
      return errorResponse(res, error, "Invalid input", null, 400);
    }
    const { orderId, rating, comment } = value;
    const createdRating = await service.createRating(orderId, rating, comment);
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

export const getAllRatings = async (req, res) => {
  try {
    const { error, value } = validation.paginationSchema.validate(req.query);
    if (error) {
      return errorResponse(res, error, "Invalid query parameters", null, 400);
    }
    const role = req.user?.role || "user";
    const { page, limit, sortBy, order, ratingValue } = value;
    const ratings = await service.getAllRatings({
      page,
      limit,
      sortBy,
      order,
      role,
      ratingValue,
    });
    return successResponse(res, "Ratings retrieved successfully", ratings);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve ratings", null, 500);
  }
};

export const getRatingsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const ratings = await service.getRatingsByOrderId(orderId);
    return successResponse(res, "Ratings retrieved successfully", ratings);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve ratings", null, 500);
  }
};

export const updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { error, value } = validation.updateRatingSchema.validate(req.body);
    if (error) {
      return errorResponse(res, error, "Invalid input", null, 400);
    }
    const { rating, comment } = value;
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
