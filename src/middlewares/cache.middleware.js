import { cache } from "../utils/cache.js";
import logger from "../config/logger.config.js";

export async function cacheMiddleware(req, res, next) {
  try {
    const role = req.user?.role || "user";
    const key = `cache:${role}:${req.originalUrl}`;

    const cached = await cache.get(key);
    if (cached) {
      logger.info(`Cache hit for ${role}:${req.originalUrl}`);
      return res.json({
        source: "cache",
        ...cached,
      });
    }

    const originalJson = res.json.bind(res);

    res.json = async (data) => {
      await cache.set(key, data);
      return originalJson({
        source: "db",
        ...data,
      });
    };

    next();
  } catch (err) {
    logger.error("Error in cache middleware:", err);
    next();
  }
}
