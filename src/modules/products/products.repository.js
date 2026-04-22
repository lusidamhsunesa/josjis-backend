import db from "../../config/db.config.js";

export const createProduct = async (name, price, description, imgKeys) => {
  const product = await db.products.create({
    data: {
      name,
      price,
      description,
      img_keys: imgKeys,
    },
  });
  return product;
};

export const getProducts = async ({
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

  const products = await db.products.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: order,
    },
    skip,
    take: limit,
  });

  const total = await db.products.count({
    where: whereCondition,
  });

  return {
    products,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (id) => {
  const product = await db.products.findFirst({
    where: {
      id,
      is_deleted: false,
    },
  });
  return product;
};

export const updateProduct = async (id, data) => {
  const updatedProduct = await db.products.update({
    where: {
      id,
    },
    data,
  });
  return updatedProduct;
};

export const deleteProduct = async (id) => {
  const deletedProduct = await db.products.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
    },
  });
  return deletedProduct;
};
