import * as repository from "./rating.repository.js";

export const createRating = async (orderId, rating, comment) => {
  return await repository.createRating(orderId, rating, comment);
};

export const getAllRatings = async (query) => {
  const params = {
    page: Number(query.page),
    limit: Number(query.limit),
    sortBy: query.sortBy,
    order: query.order,
    role: query.role,
    ratingValue: query.ratingValue,
  };
  return await repository.getAllRatings(params);
};

export const getRatingsByOrderId = async (orderId) => {
  return await repository.getRatingsByOrderId(orderId);
};

export const updateRating = async (ratingId, rating, comment) => {
  return await repository.updateRating(ratingId, rating, comment);
};

export const deleteRating = async (ratingId) => {
  await repository.deleteRating(ratingId);
};
