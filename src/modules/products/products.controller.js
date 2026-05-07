import * as service from "./products.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import * as validation from "./products.validation.js";
import * as dto from "./products.dto.js";

export const createProduct = async (req, res) => {
  try {
    const { error, value } = validation.createProductSchema.validate(req.body);

    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }
    const { name, price, description, category } = value;
    const imgs = req.files;
    const product = await service.createProduct(
      name,
      price,
      description,
      category,
      imgs,
    );
    return successResponse(
      res,
      "Product created successfully",
      dto.productDto(product),
      201,
    );
  } catch (error) {
    return errorResponse(res, error, "Failed to create product", null, 500);
  }
};

export const getProducts = async (req, res) => {
  try {
    const { error, value } = validation.paginationSchema.validate(req.query);

    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }
    const role = req.user?.role || "user";
    const { page, limit, search, sortBy, order } = value;
    const products = await service.getProducts({
      page,
      limit,
      search,
      sortBy,
      order,
      role,
    });
    return successResponse(
      res,
      "Products retrieved successfully",
      dto.productListDto(products),
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to retrieve products", null, 500);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getProductById(id);
    if (!product) {
      return errorResponse(res, product, "Product not found", null, 404);
    }
    return successResponse(
      res,
      "Product retrieved successfully",
      dto.productDto(product),
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to retrieve product", null, 500);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = validation.updateProductSchema.validate(req.body);

    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }

    const { name, price, description, is_active, is_deleted } = value;
    const imgs = req.files;
    // console.log("imgs in controller:", imgs);
    const updatedProduct = await service.updateProduct(
      id,
      {
        name,
        price,
        description,
        is_active,
        is_deleted,
      },
      imgs,
    );
    if (!updatedProduct) {
      return errorResponse(res, updatedProduct, "Product not found", null, 404);
    }
    return successResponse(
      res,
      "Product updated successfully",
      updatedProduct,
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to update product", null, 500);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.deleteProduct(id);
    if (!deletedProduct) {
      return errorResponse(res, deletedProduct, "Product not found", null, 404);
    }
    return successResponse(
      res,
      "Product deleted successfully",
      deletedProduct,
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error, "Failed to delete product", null, 500);
  }
};
