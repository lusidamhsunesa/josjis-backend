import db from "../../config/db.config.js";

export const createRating = async (userId, orderId, rating, comment) => {
  const createdRating = await db.ratings.create({
    data: {
      user_id: userId,
      order_id: orderId,
      rating,
      comment,
    },
  });
  return createdRating;
};

export const getRatingsByUserId = async (userId) => {
  const ratings = await db.ratings.findMany({
    where: { orders: { user_id: userId } },
    include: {
      ratings: true,
    },
  });
  return ratings;
};

export const updateRating = async (ratingId, rating, comment) => {
  const updatedRating = await db.ratings.update({
    where: { id: ratingId },
    data: {
      ...rating,
      ...comment,
    },
  });
  return updatedRating;
};

export const deleteRating = async (ratingId) => {
  await db.ratings.delete({
    where: { id: ratingId },
  });
};
