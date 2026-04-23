import db from "../../config/db.config.js";

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

export const getOrders = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "created_at",
  order = "desc",
  role = "user",
}) => {
  const skip = (page - 1) * limit;

  const whereCondition = {
    ...(role !== "admin" && {
      is_deleted: false,
      is_active: true,
    }),
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),
  };

  const orders = await db.orders.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: order,
    },
    skip,
    take: limit,
  });

  const total = await db.orders.count({
    where: whereCondition,
  });

  return {
    orders,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getOrderById = async (id) => {
  return await db.orders.findUnique({
    where: { id },
    include: {
      order_items: true,
    },
  });
};

export const getOrdersByTableId = async (tableId) => {
  return await db.orders.findMany({
    where: { table_id: tableId },
    include: {
      order_items: true,
    },
  });
};

export const updateOrderStatus = async (id, status) => {
  return await db.orders.update({
    where: { id },
    data: { status },
  });
};

export const deleteOrder = async (id) => {
  return await db.orders.delete({
    where: { id },
  });
};
