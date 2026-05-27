import * as controller from "./payment.controller.js";
import { Router } from "express";
import {
  authMiddleware,
  optionalAuth,
} from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/authRole.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles(["admin"]),
  controller.createPayment,
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles(["admin"]),
  cacheMiddleware,
  controller.getAllPayments,
);
router.get("/order/:id", cacheMiddleware, controller.getPaymentByOrderId);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  controller.updatePaymentStatus,
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  controller.deletePayment,
);

export default router;
