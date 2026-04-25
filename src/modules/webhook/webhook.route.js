import * as controller from "./webhook.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", controller.handleWebhook);

export default router;
