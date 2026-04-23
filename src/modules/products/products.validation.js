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

export const createProductSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.base": "Name must be a string",
    "string.max": "Name must be less than 255 characters long",
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  description: Joi.string().max(1000).default("").messages({
    "string.base": "Description must be a string",
    "string.max": "Description must be less than 1000 characters long",
  }),
  category: Joi.string().max(255).default("").messages({
    "string.base": "Category must be a string",
    "string.max": "Category must be less than 255 characters long",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().max(255).messages({
    "string.base": "Name must be a string",
    "string.max": "Name must be less than 255 characters long",
    "string.empty": "Name cannot be empty",
  }),
  description: Joi.string().max(1000).default("").messages({
    "string.base": "Description must be a string",
    "string.max": "Description must be less than 1000 characters long",
  }),
  category: Joi.string().max(255).default("").messages({
    "string.base": "Category must be a string",
    "string.max": "Category must be less than 255 characters long",
  }),
  price: Joi.number().positive().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
  }),
});
