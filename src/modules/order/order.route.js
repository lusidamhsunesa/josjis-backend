import * as controller from "./order.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", controller.createOrder);
router.get("/", authMiddleware, controller.getOrders);
router.get("/:id", controller.getOrderById);
router.get("/table/:tableId", controller.getOrderByTableId);
router.put("/:id", authMiddleware, controller.updateOrderStatus);
router.delete("/:id", authMiddleware, controller.deleteOrder);

export default router;
