import express from "express";
import authRoute from "./modules/auth/auth.route.js";
import productRoute from "./modules/products/products.route.js";
import orderRoute from "./modules/order/order.route.js";
import paymentRoute from "./modules/payment/payment.route.js";
import tableRoute from "./modules/table/table.route.js";
import ratingRoute from "./modules/rating/rating.route.js";
import limiter from "./middlewares/rate.limiter.js";
import logger from "./middlewares/logger.js";
import adminCredentials from "./config/admin.credential.js";
import webhookRoute from "./modules/webhook/webhook.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(logger);
adminCredentials;

app.get("/", (req, res) => {
  res.send("API is Running!");
});

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/tables", tableRoute);
app.use("/api/ratings", ratingRoute);
app.use("/api/midtrans/webhooks", webhookRoute);
export default app;
