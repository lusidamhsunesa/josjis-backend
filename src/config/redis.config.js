import { createClient } from "redis";
const isRedisEnabled = process.env.REDIS_ENABLED === "true";
import logger from "../config/logger.config.js";

let redis = null;
if (isRedisEnabled) {
  redis = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  redis.on("error", (err) => {
    logger.error("Redis error:", err);
  });

  await redis.connect();
}

export { redis, isRedisEnabled };

// export const redisClient = createClient({
//   username: process.env.REDIS_USERNAME,
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//   },
// });

// redisClient.on("error", (err) => {
//   console.error("Redis error:", err);
// });

// await redisClient.connect();
