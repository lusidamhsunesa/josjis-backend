import * as controller from "./products.controller.js";
import { Router } from "express";
import { handleUploadError } from "../../middlewares/handleUpdloadError.js";
import upload from "../../middlewares/upload.middleware.js";
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
  authorizeRoles("admin"),
  handleUploadError(upload.array("img", 5)),
  controller.createProduct,
);

router.get("/", optionalAuth, cacheMiddleware, controller.getProducts);
router.get("/:id", optionalAuth, cacheMiddleware, controller.getProductById);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  handleUploadError(upload.array("img", 5)),
  controller.updateProduct,
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  controller.deleteProduct,
);

export default router;
