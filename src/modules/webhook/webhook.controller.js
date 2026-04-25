import * as service from "./webhook.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const handleWebhook = (req, res) => {
  const data = req.body;

  // console.log("Received webhook:", JSON.stringify(data, null, 2));

  try {
    service.webhookHandler(data);
    return successResponse(res, "Webhook processed successfully", null, 200);
  } catch (error) {
    return errorResponse(res, error, "Failed to process webhook", null, 500);
  }
};
