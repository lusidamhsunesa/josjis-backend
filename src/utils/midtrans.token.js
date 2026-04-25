import midtransClient from "midtrans-client";

export const createMidtransTransaction = async (data) => {
  try {
    const { orderId, grossAmount, customerName, email, items } = data;

    if (!orderId || !grossAmount || !customerName || !email) {
      throw new Error("Missing required fields for Midtrans transaction");
    }

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY || "",
      // clientKey: "dummy-client-key",
    });

    const item_details = items.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.qty,
      name: item.name,
    }));

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details,
      customer_details: {
        first_name: customerName,
        email: email,
      },
      metadata: {
        website_id: process.env.MIDTRANS_WEBSITE_ID,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return transaction;
  } catch (err) {
    console.error("Midtrans token error:", err.message);
    throw new Error("Failed to create token");
  }
};
