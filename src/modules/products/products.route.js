import * as controller from "./products.controller.js";
import { Router } from "express";
import { handleUploadError } from "../../middlewares/handleUpdloadError.js";
import upload from "../../middlewares/upload.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/authRole.middleware.js";

const router = Router();

router.post(
  "/",
  handleUploadError(upload.array("img", 5)),
  controller.createProduct,
);

router.get("/", authMiddleware, controller.getProducts);
router.get("/:id", authMiddleware, controller.getProductById);
router.put(
  "/:id",
  handleUploadError(upload.array("img", 5)),
  controller.updateProduct,
);
router.delete("/:id", controller.deleteProduct);

export default router;
