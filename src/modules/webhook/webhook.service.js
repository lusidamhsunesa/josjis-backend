import crypto from "crypto";
import * as repository from "./webhook.repository.js";

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

export const webhookHandler = (data) => {
  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    fraud_status,
    metadata,
  } = data;

  // verify signature
  const expectedSignature = crypto
    .createHash("sha512")
    .update(order_id + status_code + gross_amount + SERVER_KEY)
    .digest("hex");

  if (signature_key !== expectedSignature) {
    // console.log(" Invalid signature!");
    throw new Error("Invalid signature");
  }

  if (data.metadata.website_id !== process.env.MIDTRANS_WEBSITE_ID) {
    return res
      .status(403)
      .json({ message: "Invalid website ID for this webhook" });
  }
  // console.log("✅Signature valid");

  // log info penting
  // console.log("Order ID:", order_id);
  // console.log("Transaction Status:", transaction_status);
  // console.log("Fraud Status:", fraud_status);

  // handling status
  switch (transaction_status) {
    case "capture":
    case "settlement":
      if (fraud_status === "accept") {
        // console.log("💰 Pembayaran sukses");
        repository.updateStatusPayment(order_id, "paid");
      }
      break;

    case "pending":
      // console.log("⏳ Menunggu pembayaran");
      break;

    case "deny":
      // console.log("❌ Ditolak");
      break;

    case "expire":
      // console.log("⌛ Expired");
      break;

    case "cancel":
      // console.log("🚫 Dibatalkan");
      break;

    default:
    // console.log("⚠️ Status tidak dikenal");
  }

  // wajib balas 200
  return { message: "Webhook processed" };
};
