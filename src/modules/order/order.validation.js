import Joi from "joi";

export const createOrderSchema = Joi.object({
  tableId: Joi.string().uuid().messages({
    "string.base": "Table ID must be a string",
    "string.uuid": "Table ID must be a valid UUID",
  }),

  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().uuid().required(),
        quantity: Joi.number().integer().min(1).required(),
        notes: Joi.string().max(255).default("").messages({
          "string.base": "Notes must be a string",
          "string.max": "Notes must be less than 255 characters long",
        }),
      }),
    )
    .min(1)
    .required(),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "in_progress", "can_be_taken", "completed", "cancelled")
    .required()
    .messages({
      "any.only":
        "Status must be one of 'pending', 'in_progress', 'can_be_taken', 'completed', or 'cancelled'",
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
  search: Joi.string().max(100).default("").messages({
    "string.max": "Search query must be less than 100 characters long",
  }),
  sortBy: Joi.string()
    .valid("name", "email", "created_at")
    .default("created_at")
    .messages({
      "any.only": "SortBy must be one of 'name', 'email', or 'created_at'",
    }),
  order: Joi.string().valid("asc", "desc").default("desc").messages({
    "any.only": "Order must be either 'asc' or 'desc'",
  }),
});
