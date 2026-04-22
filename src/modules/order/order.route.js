import * as controller from "./order.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", controller.createOrder);

export default router;
