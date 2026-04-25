import * as controller from "./payment.controller.js";
import { Router } from "express";
import {
  authMiddleware,
  optionalAuth,
} from "../../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = Router();

router.post("/", controller.createPayment);
router.get("/", cacheMiddleware, controller.getAllPayments);
router.get("/order/:id", cacheMiddleware, controller.getPaymentByOrderId);
router.put("/:id", controller.updatePaymentStatus);
router.delete("/:id", controller.deletePayment);

export default router;
