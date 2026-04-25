import * as controller from "./table.controller.js";
import {
  authMiddleware,
  optionalAuth,
} from "../../middlewares/auth.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, controller.createTable);
router.get("/", optionalAuth, cacheMiddleware, controller.getAllTables);
router.put("/:id", authMiddleware, controller.updateTable);
router.delete("/:id", authMiddleware, controller.deleteTable);

export default router;
