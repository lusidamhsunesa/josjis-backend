import Joi from "joi";

export const createTableSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.base": "Name must be a string",
    "string.max": "Name must be less than 255 characters long",
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  capacity: Joi.number().integer().min(1).required().messages({
    "number.base": "Capacity must be a number",
    "number.integer": "Capacity must be an integer",
    "number.min": "Capacity must be at least 1",
    "any.required": "Capacity is required",
  }),
});

export const updateTableSchema = Joi.object({
  name: Joi.string().max(255).messages({
    "string.base": "Name must be a string",
    "string.max": "Name must be less than 255 characters long",
  }),
  capacity: Joi.number().integer().min(1).messages({
    "number.base": "Capacity must be a number",
    "number.integer": "Capacity must be an integer",
    "number.min": "Capacity must be at least 1",
  }),
});
