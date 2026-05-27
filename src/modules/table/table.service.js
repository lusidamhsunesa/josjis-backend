import * as service from "./table.repository.js";
import { cache } from "../../utils/cache.js";

const invalidateTablesCache = async (id = null) => {
  await cache.delPattern("cache:admin:/api/tables*");
  await cache.delPattern("cache:user:/api/tables*");
};

export const createTable = async (data) => {
  await invalidateTablesCache();
  const table = await service.createTable(data);
  return table;
};

export const getAllTables = async (isAdmin) => {
  const tables = await service.getAllTables(isAdmin);
  return tables;
};

export const updateTable = async (tableId, data) => {
  await invalidateTablesCache();
  const table = await service.updateTable(tableId, data);
  return table;
};

export const deleteTable = async (tableId) => {
  await invalidateTablesCache();
  const table = await service.deleteTable(tableId);
  return table;
};
