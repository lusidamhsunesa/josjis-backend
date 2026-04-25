const PUBLIC_URL = process.env.PUBLIC_URL;

export const productDto = (product) => {
  return {
    ...product,
    img_urls: (product.img_keys || []).map(
      (key) => `${PUBLIC_URL}/uploads/${key}`,
    ),
  };
};

export const productListDto = (products) => {
  return {
    ...products,
    products: products.products.map(productDto),
  };
};
