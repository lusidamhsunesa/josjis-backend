import * as repository from "./products.repository.js";
import { cache } from "../../utils/cache.js";
import { uploadFileToS3, deleteFileFromS3 } from "../../utils/s3.js";

export const createProduct = async (name, price, description, imgs) => {
  const uploaded = await Promise.all(imgs.map((img) => uploadFileToS3(img)));
  const imgKeys = uploaded.map((item) => item.key);
  const product = await repository.createProduct(
    name,
    price,
    description,
    imgKeys,
  );
  return product;
};

export const getProducts = async (query) => {
  const params = {
    page: Number(query.page),
    limit: Number(query.limit),
    search: query.search,
    sortBy: query.sortBy,
    order: query.order,
    role: query.role,
  };

  const products = await repository.getProducts(params);

  return products;
};

export const getProductById = async (id) => {
  const product = await repository.getProductById(id);
  return product;
};

export const updateProduct = async (id, data, imgs) => {
  let imgKeys = [];

  const existingProduct = await repository.getProductById(id);

  // delete old images
  if (existingProduct.img_keys?.length) {
    await Promise.all(
      existingProduct.img_keys.map((key) => deleteFileFromS3(key)),
    );
  }

  // upload new images (safe)
  const uploaded = await Promise.all(
    (imgs || []).map((img) => uploadFileToS3(img)),
  );

  imgKeys = uploaded.map((item) => item.key);

  const updatedProduct = await repository.updateProduct(id, {
    ...data,
    ...(imgKeys.length > 0 && {
      img_keys: imgKeys,
    }),
  });

  return updatedProduct;
};

export const deleteProduct = async (id) => {
  const product = await repository.deleteProduct(id);
  return product;
};
