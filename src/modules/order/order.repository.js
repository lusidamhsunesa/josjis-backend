import db from "../../config/db.config.js";

// export const createOrder = async (userId, data) => {
//   const order = await db.orders.create({
//     data: {
//       user_id: userId,
//       status: "pending",
//     },
//   });
//   return order;
// };

// export const createOrderItems = async (orderId, items) => {
//   const orderItems = await db.order_items.createMany({
//     data: items.map((item) => ({
//       order_id: orderId,
//       product_id: item.productId,
//       qty: item.quantity,
//     })),
//   });

//   return orderItems;
// };

// export const findProductsByIds = async (productIds) => {
//   return await db.products.findMany({
//     where: {
//       id: { in: productIds },
//     },
//   });
// };

export const createOrderWithItems = async (tx, data) => {
  return await tx.orders.create({
    data: {
      table_id: data.table_id,
      status: data.status,
      total_amount: data.total_amount,

      order_items: {
        create: data.items.map((item) => ({
          product_id: item.product_id,
          qty: item.qty,
          price: item.price,
          subtotal: item.subtotal,
        })),
      },
    },
    include: {
      order_items: true, // optional
    },
  });
};

export const findProductsByIds = async (tx, productIds) => {
  return await tx.products.findMany({
    where: {
      id: { in: productIds },
    },
  });
};
