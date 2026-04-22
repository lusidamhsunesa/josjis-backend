import * as repository from "./rating.repository.js";

export const createRating = async (userId, orderId, rating, comment) => {
  return await repository.createRating(userId, orderId, rating, comment);
};

export const getRatingsByUserId = async (userId) => {
  return await repository.getRatingsByUserId(userId);
};

export const updateRating = async (ratingId, rating, comment) => {
  return await repository.updateRating(ratingId, rating, comment);
};

export const deleteRating = async (ratingId) => {
  await repository.deleteRating(ratingId);
};
