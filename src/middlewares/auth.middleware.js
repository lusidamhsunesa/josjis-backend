import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import logger from "../config/logger.config.js";

export const authMiddleware = (req, res, next) => {
  const token =
    req.cookies.access_token ||
    req.headers.authorization?.split(" ")[1] ||
    req.cookies.admin_token;

  if (!token) return errorResponse(res, token, "Access denied", null, 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info(`Authenticated user ID: ${decoded.id}, Role: ${decoded.role}`);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, error, "Invalid token", null, 403);
  }
};

export const optionalAuth = (req, res, next) => {
  const token =
    req.cookies?.access_token ||
    req.headers.authorization?.split(" ")[1] ||
    req.cookies?.admin_token;

  // 👉 kalau tidak ada token → lanjut aja
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user
  } catch (error) {
    // 👉 kalau token invalid / expired → ignore aja
    req.user = null;
  }

  next();
};

// export const adminAuthMiddleware = (req, res, next) => {
//   const token =
//     req.cookies.admin_token || req.headers.authorization?.split(" ")[1];

//   if (!token) return errorResponse(res, token, "Access denied", null, 401);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return errorResponse(res, error, "Invalid token", null, 403);
//   }
// };
