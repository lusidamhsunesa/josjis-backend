import { redis, isRedisEnabled } from "../config/redis.config.js";

const cache_ttl = process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 60;

export const cache = {
  async get(key) {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Cache GET error:", err);
      return null;
    }
  },

  async set(key, value, ttl = cache_ttl) {
    try {
      await redis.set(key, JSON.stringify(value), {
        EX: ttl,
      });
    } catch (err) {
      console.error("Cache SET error:", err);
    }
  },

  async del(key) {
    if (!isRedisEnabled || !redis) return;

    try {
      await redis.del(key);
    } catch (err) {
      console.error("Cache DEL error:", err);
    }
  },
};
