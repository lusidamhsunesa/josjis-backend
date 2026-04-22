import Joi from "joi";
import logger from "./logger.config.js";

const envSchema = Joi.object({
  // Server
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid("dev", "development", "production")
    .default("dev"),

  // JWT
  JWT_SECRET: Joi.string().min(10).required(),

  // Cookie / Token Expiry (hours)
  ACCESS_TOKEN_EXPIRES_IN: Joi.number().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.number().required(),
  GUEST_ID_EXPIRES_IN: Joi.number().required(),
  ADMIN_TOKEN_EXPIRES_IN: Joi.number().required(),

  // Database
  DATABASE_URL: Joi.string().uri().required(),
  DIRECT_URL: Joi.string().uri().required(),

  // Redis
  REDIS_URL: Joi.string().uri().allow("", null),
  REDIS_ENABLED: Joi.boolean().truthy("true").falsy("false").default(false),
  REDIS_CACHE_TTL: Joi.number().default(60),

  // Rate Limit
  RATE_LIMIT_WINDOW: Joi.number().default(10),
  RATE_LIMIT_MAX: Joi.number().default(100),

  // CORS
  CORS_ORIGIN: Joi.string().allow("*").required(),

  // S3
  S3_ENDPOINT: Joi.string().required(),
  S3_REGION: Joi.string().required(),
  S3_ACCESS_KEY: Joi.string().required(),
  S3_SECRET_KEY: Joi.string().required(),
  S3_BUCKET: Joi.string().required(),

  // Public URL
  PUBLIC_URL: Joi.string().uri().required(),

  // Image
  IMAGE_MAX_SIZE: Joi.number().default(200),
  IMAGE_QUALITY: Joi.number().min(1).max(100).default(80),
  IMAGE_UPLOAD_SIZE_LIMIT: Joi.number().default(3),

  // Admin
  ADMIN_NAME: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().email().required(),
  ADMIN_PASSWORD: Joi.string().min(6).required(),

  // Midtrans
  MIDTRANS_SERVER_KEY: Joi.string().required(),
}).unknown(); // allow another env vars that are not defined in the schema

const { error, value } = envSchema.validate(process.env, {
  abortEarly: false, // report all errors, not just the first one
  convert: true, // auto convert string → number/boolean
});

logger.info("Environment variables validated successfully");

if (error) {
  logger.error("ENV VALIDATION ERROR:");
  error.details.forEach((err) => {
    logger.error(`- ${err.message}`);
  });
  process.exit(1);
}

export default value;
