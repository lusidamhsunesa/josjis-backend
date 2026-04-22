import * as controller from "./payment.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", controller.createPayment);
router.get("/:id", controller.getPaymentById);
router.put("/:id", controller.updatePaymentStatus);
router.delete("/:id", controller.deletePayment);

export default router;
