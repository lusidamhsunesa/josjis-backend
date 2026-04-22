import * as service from "./table.repository.js";

export const createTable = async (data) => {
  const table = await service.createTable(data);
  return table;
};

export const getAllTables = async (isAdmin) => {
  const tables = await service.getAllTables(isAdmin);
  return tables;
};

export const updateTable = async (tableId, data) => {
  const table = await service.updateTable(tableId, data);
  return table;
};

export const deleteTable = async (tableId) => {
  const table = await service.deleteTable(tableId);
  return table;
};
