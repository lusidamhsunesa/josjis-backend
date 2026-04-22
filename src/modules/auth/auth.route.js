import { Router } from "express";
import * as controller from "./auth.controller.js";
import { authorizeRoles } from "../../middlewares/authRole.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

// Guest routes
router.post("/guest", controller.createGuest);
router.get(
  "/guest/me",
  authMiddleware,
  authorizeRoles("guest"),
  controller.getGuest,
);
router.get("/guest/refresh-token", controller.guestRefreshToken);

// users route
router.post(
  "/register",
  authMiddleware,
  authorizeRoles("guest"),
  controller.createUser,
);
router.post("/login", controller.LoginUser);
router.get("/me", authMiddleware, authorizeRoles("user"), controller.getUser);
router.get("/refresh-token", controller.getRefreshToken);
router.post(
  "/logout",
  authMiddleware,
  authorizeRoles("user"),
  controller.deleteRefreshToken,
);

// admin route
router.post("/admin/login", controller.LoginAdmin);
router.get("/admin/me", controller.getAdmin);
router.get("/admin/refresh-token", controller.getRefreshToken);
router.post(
  "/admin/logout",
  authorizeRoles("admin"),
  controller.deleteRefreshToken,
);

export default router;
