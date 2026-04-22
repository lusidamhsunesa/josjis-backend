import { PrismaClient } from "@prisma/client";

// Init PrismaClient
const db = new PrismaClient();

// Export repository functions for User module
export default db;
