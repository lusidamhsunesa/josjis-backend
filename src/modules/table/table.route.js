import * as controller from "./table.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/", controller.createTable);
router.get("/", authMiddleware, controller.getAllTables);
router.put("/:id", controller.updateTable);
router.delete("/:id", controller.deleteTable);

export default router;
