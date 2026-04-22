import * as repository from "./order.repository.js";
import db from "../../config/db.config.js";
// export const createOrder = async (userId, data) => {
//   if (!data.items || data.items.length === 0) {
//     throw new Error("Items is required");
//   }
//   const order = await repository.createOrder(userId, data);
//   await repository.createOrderItems(order.id, data.items);
//   return order;
// };

export const createOrder = async (tableId, data) => {
  if (!data.items || data.items.length === 0) {
    throw new Error("Items is required");
  }

  return await db.$transaction(async (tx) => {
    // 1. ambil semua product
    const productIds = data.items.map((i) => i.productId);

    const products = await repository.findProductsByIds(tx, productIds);

    // 2. mapping product
    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    // 3. build order items + hitung subtotal
    const orderItems = data.items.map((item) => {
      const product = productMap[item.productId];

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const price = product.price;
      const qty = item.quantity;
      const subtotal = price * qty;

      return {
        product_id: item.productId,
        qty,
        price,
        subtotal,
      };
    });

    // 4. hitung total
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + Number(item.subtotal),
      0,
    );

    // 5. create order + nested items
    const order = await repository.createOrderWithItems(tx, {
      table_id: tableId,
      status: "pending",
      total_amount: totalAmount,
      items: orderItems,
    });

    return order;
  });
};
