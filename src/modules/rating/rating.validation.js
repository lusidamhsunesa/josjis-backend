import Joi from "joi";

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).positive().messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be a positive integer",
  }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .positive()
    .messages({
      "number.base": "Limit must be a number",
      "number.integer": "Limit must be an integer",
      "number.min": "Limit must be a positive integer",
      "number.max": "Limit must be less than or equal to 100",
    }),
  sortBy: Joi.string()
    .valid("rating", "created_at")
    .default("created_at")
    .messages({
      "any.only": "SortBy must be one of 'rating' or 'created_at'",
    }),
  order: Joi.string().valid("asc", "desc").default("desc").messages({
    "any.only": "Order must be either 'asc' or 'desc'",
  }),
  ratingValue: Joi.number().integer().min(1).max(5).messages({
    "number.base": "Rating value must be a number",
    "number.integer": "Rating value must be an integer",
    "number.min": "Rating value must be at least 1",
    "number.max": "Rating value must be at most 5",
  }),
});

export const createRatingSchema = Joi.object({
  orderId: Joi.string().uuid().required().messages({
    "string.base": "Order ID must be a string",
    "string.uuid": "Order ID must be a valid UUID",
    "any.required": "Order ID is required",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.integer": "Rating must be an integer",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5",
    "any.required": "Rating is required",
  }),
  comment: Joi.string().max(255).allow(null, "").messages({
    "string.max": "Comment must be at most 255 characters",
  }),
});

export const updateRatingSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).messages({
    "number.base": "Rating must be a number",
    "number.integer": "Rating must be an integer",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5",
  }),
  comment: Joi.string().max(255).allow(null, "").messages({
    "string.max": "Comment must be at most 255 characters",
  }),
});
