import Joi from "joi";

export const createPaymentSchema = Joi.object({
  orderId: Joi.string().uuid().required().messages({
    "string.base": "Order ID must be a string",
    "string.uuid": "Order ID must be a valid UUID",
    "any.required": "Order ID is required",
  }),
  method: Joi.string().valid("cash", "midtrans").required().messages({
    "string.base": "Payment method must be a string",
    "any.only": "Payment method must be either 'cash' or 'midtrans'",
    "any.required": "Payment method is required",
  }),
});

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
    .valid("amount", "created_at")
    .default("created_at")
    .messages({
      "any.only": "SortBy must be one of 'amount', or 'created_at'",
    }),
  order: Joi.string().valid("asc", "desc").default("desc").messages({
    "any.only": "Order must be either 'asc' or 'desc'",
  }),
  status: Joi.string().valid("pending", "paid", "failed").messages({
    "any.only": "Status must be one of 'pending', 'paid', or 'failed'",
  }),
  method: Joi.string().valid("cash", "midtrans").messages({
    "any.only": "Method must be one of 'cash' or 'midtrans'",
  }),
});
