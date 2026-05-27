import * as controller from "./rating.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { Router } from "express";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = Router();

router.post("/", authMiddleware, controller.createRating);
router.get("/", authMiddleware, cacheMiddleware, controller.getAllRatings);
router.get(
  "/order/:orderId",
  authMiddleware,
  cacheMiddleware,
  controller.getRatingsByOrderId,
);
router.put("/:ratingId", authMiddleware, controller.updateRating);
// router.delete("/:ratingId", authMiddleware, controller.deleteRating);

export default router;
