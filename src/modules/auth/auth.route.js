import { Router } from "express";
import * as controller from "./auth.controller.js";
import { authorizeRoles } from "../../middlewares/authRole.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

// admin route
router.post("/admin/login", controller.LoginAdmin);
router.get(
  "/admin/me",
  authMiddleware,
  authorizeRoles("admin"),
  controller.getAdmin,
);
router.get("/admin/refresh-token", controller.getRefreshToken);
router.post(
  "/admin/logout",
  authMiddleware,
  authorizeRoles("admin"),
  controller.deleteRefreshToken,
);

export default router;
