import db from "./db.config.js";
import logger from "./logger.config.js";
import bcrypt from "bcrypt";

// Admin credentials from environment variables
const adminCredentials = {
  name: process.env.ADMIN_NAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

// Function to check if admin user exists, if not create it
const ensureAdminUser = async () => {
  const existingAdmin = await db.users.findFirst({
    where: {
      email: adminCredentials.email,
      role: "admin",
    },
  });

  if (!existingAdmin) {
    await db.users.create({
      data: {
        name: adminCredentials.name,
        email: adminCredentials.email,
        password: await bcrypt.hash(adminCredentials.password, 10),
        role: "admin",
      },
    });
    logger.info("Admin user created.");
  } else {
    logger.info("Admin user already exists.");
  }
};

// Call the function to ensure admin user is set up
ensureAdminUser();

export default adminCredentials;
