import * as service from "./table.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import * as validation from "./table.validation.js";

export const createTable = async (req, res) => {
  try {
    const { error, value } = validation.createTableSchema.validate(req.body);

    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }

    const table = await service.createTable(value);
    return successResponse(res, "Table created successfully", table, 201);
  } catch (error) {
    return errorResponse(res, error, "Failed to create table", null, 500);
  }
};

export const getAllTables = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const tables = await service.getAllTables(isAdmin);
    return successResponse(res, "Tables retrieved successfully", tables);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve tables", null, 500);
  }
};

export const updateTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const { error, value } = validation.updateTableSchema.validate(req.body);

    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }

    const table = await service.updateTable(tableId, value);
    return successResponse(res, "Table updated successfully", table);
  } catch (error) {
    return errorResponse(res, error, "Failed to update table", null, 500);
  }
};

export const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    await service.deleteTable(tableId);
    return successResponse(res, "Table deleted successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to delete table", null, 500);
  }
};
