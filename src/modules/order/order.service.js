import * as repository from "./order.repository.js";
import db from "../../config/db.config.js";
import { cache } from "../../utils/cache.js";
import { getIO } from "../../config/socket.config.js";

const invalidateOrdersCache = async (id = null) => {
  await cache.del("cache:admin:/api/orders*");
  await cache.del("cache:user:/api/orders*");
};

export const createOrder = async (tableId, data) => {
  invalidateOrdersCache();
  if (!data.items || data.items.length === 0) {
    throw new Error("Items is required");
  }

  return await db.$transaction(async (tx) => {
    // 1. get all products
    const productIds = data.items.map((i) => i.productId);

    const products = await repository.findProductsByIds(tx, productIds);

    // 2. mapping product
    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    // 3. build order items + count subtotal
    const orderItems = data.items.map((item) => {
      const product = productMap[item.productId];

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const price = product.price;
      const qty = item.quantity;
      const subtotal = price * qty;
      const notes = item?.notes || "";

      return {
        product_id: item.productId,
        qty,
        price,
        subtotal,
        notes,
      };
    });

    // 4. count total
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

    const io = getIO();

    io.to(`order:${order.id}`).emit("order:created", order);

    return order;
  });
};

export const getOrders = async (query) => {
  const params = {
    page: Number(query.page),
    limit: Number(query.limit),
    search: query.search,
    sortBy: query.sortBy,
    order: query.order,
    role: query.role,
  };

  const orders = await repository.getOrders(params);

  return orders;
};

export const getOrderById = async (id) => {
  const order = await repository.getOrderById(id);
  return order;
};

export const getOrderByTableId = async (tableId) => {
  const order = await repository.getOrdersByTableId(tableId);
  return order;
};

export const updateOrderStatus = async (id, status) => {
  invalidateOrdersCache();
  const updatedOrder = await repository.updateOrderStatus(id, status);
  const io = getIO();

  io.to(`order:${id}`).emit("order:status", {
    orderId: id,
    status,
    data: updatedOrder,
  });

  return updatedOrder;
};

export const deleteOrder = async (id) => {
  invalidateOrdersCache();
  const order = await repository.deleteOrder(id);
  return order;
};
