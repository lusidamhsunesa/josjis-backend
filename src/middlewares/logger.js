import logger from "../config/logger.config.js";

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    logger.info({
      host: req.hostname,
      ip: req.headers['cf-connecting-ip'],
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: Date.now() - start,
    });
  });

  next();
};

export default loggerMiddleware;
