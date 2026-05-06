import db from "../../config/db.config.js";

export const createUserRefreshToken = async (userId, refreshToken) => {
  const token = await db.refresh_token.create({
    data: {
      user_id: userId,
      token: refreshToken,
      expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return token.token;
};

export const getUserRefreshToken = async (refreshToken) => {
  const userRefreshToken = await db.refresh_token.findFirst({
    where: {
      token: refreshToken,
      expired_at: {
        gt: new Date(),
      },
    },
    include: {
      users: true,
    },
  });
  return userRefreshToken;
};

export const deleteRefreshToken = async (userId) => {
  await db.refresh_token.deleteMany({
    where: {
      user_id: userId,
    },
  });
};

export const getAdminCredential = async (email) => {
  const admin = await db.users.findUnique({
    where: {
      email: email,
      role: "admin",
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });
  return admin;
};

export const GetAdmin = async (userId) => {
  const user = await db.users.findFirst({
    where: {
      id: userId,
      role: "admin",
    },
  });
  return user;
};
