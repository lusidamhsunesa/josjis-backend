import * as controller from "./rating.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, controller.createRating);
router.get("/my", authMiddleware, controller.getRatingsByUserId);
router.put("/:ratingId", authMiddleware, controller.updateRating);
router.delete("/:ratingId", authMiddleware, controller.deleteRating);

export default router;
