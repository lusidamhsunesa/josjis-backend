import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seedUsers = async () => {
  const users = [];

  for (let i = 1; i <= 30; i++) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      password: hashedPassword,
    });
  }

  await prisma.users.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("30 users seeded!");
};

seedUsers()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
