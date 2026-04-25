import db from "../../config/db.config.js";

export const createTable = async (data) => {
  const table = await db.tables.create({
    data: {
      name: data.name,
      capacity: data.capacity,
    },
  });
  return table;
};

export const getAllTables = async (isAdmin) => {
  const tables = await db.tables.findMany(
    isAdmin ? {} : { where: { is_deleted: false } },
  );
  return tables;
};

export const updateTable = async (tableId, data) => {
  const table = await db.tables.update({
    where: { id: tableId },
    data: {
      ...data,
    },
  });
  return table;
};

export const deleteTable = async (tableId) => {
  const table = await db.tables.update({
    where: { id: tableId },
    data: {
      is_deleted: true,
    },
  });
  return table;
};
