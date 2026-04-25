import * as controller from "./order.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = Router();

router.post("/", controller.createOrder);
router.get("/", authMiddleware, cacheMiddleware, controller.getOrders);
router.get("/:id", cacheMiddleware, controller.getOrderById);
router.get("/table/:tableId", controller.getOrderByTableId);
router.put("/:id", authMiddleware, controller.updateOrderStatus);
router.delete("/:id", authMiddleware, controller.deleteOrder);

export default router;
