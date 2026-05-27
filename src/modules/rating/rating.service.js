import * as repository from "./rating.repository.js";
import { cache } from "../../utils/cache.js";

const invalidateRatingsCache = async (id = null) => {
  await cache.delPattern("cache:admin:/api/ratings*");
  await cache.delPattern("cache:user:/api/ratings*");
};

export const createRating = async (orderId, rating, comment) => {
  await invalidateRatingsCache();
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
  await invalidateRatingsCache();
  return await repository.updateRating(ratingId, rating, comment);
};

export const deleteRating = async (ratingId) => {
  await invalidateRatingsCache();
  await repository.deleteRating(ratingId);
};
