import db from "../../config/db.config.js";

export const createRating = async (orderId, rating, comment) => {
  const createdRating = await db.ratings.create({
    data: {
      order_id: orderId,
      rating,
      comment,
    },
  });
  return createdRating;
};

export const getAllRatings = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  order = "desc",
  role = "user",
  ratingValue = undefined,
}) => {
  const skip = (page - 1) * limit;

  const whereCondition = {
    ...(ratingValue !== undefined && {
      rating: ratingValue,
    }),
  };

  const ratings = await db.ratings.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: order,
    },
    skip,
    take: limit,
  });

  const total = await db.ratings.count({
    where: whereCondition,
  });

  return {
    ratings,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getRatingsByOrderId = async (orderId) => {
  const ratings = await db.ratings.findMany({
    where: { order_id: orderId },
    include: {
      orders: true,
    },
  });
  return ratings;
};

export const updateRating = async (ratingId, rating, comment) => {
  const updatedRating = await db.ratings.update({
    where: { id: ratingId },
    data: {
      rating,
      comment,
    },
  });
  return updatedRating;
};

export const deleteRating = async (ratingId) => {
  await db.ratings.delete({
    where: { id: ratingId },
  });
};
