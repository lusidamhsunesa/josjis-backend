import db from "../../config/db.config.js";

export const findGuestId = async (guestId) => {
  const guest = await db.users.findFirst({
    where: {
      role: "guest",
      guest_id: guestId,
    },
  });
  return guest;
};

export const findUserId = async (userId) => {
  const user = await db.users.findFirst({
    where: {
      role: "user",
      id: userId,
    },
  });
  return user;
};

export const findUserEmail = async (email) => {
  const user = await db.users.findFirst({
    where: {
      email: email,
      role: "user",
    },
  });
  return user;
};

export const createGuest = async (userAgent, userIp) => {
  const guest = await db.users.create({
    data: {
      user_agent: userAgent,
      device_ip: userIp,
    },
  });
  return guest;
};

export const getGuest = async (id) => {
  const guest = await db.users.findUnique({
    where: {
      id: id,
      role: "guest",
    },
  });
  return guest;
};

export const createUser = async (
  userId,
  name,
  email,
  password,
  userAgent,
  userIp,
) => {
  const user = await db.users.update({
    where: {
      id: userId,
    },
    data: {
      name: name,
      email: email,
      password: password,
      user_agent: userAgent,
      device_ip: userIp,
      role: "user",
      guest_id: userId,
    },
  });
  return user;
};

export const getUserCredential = async (email) => {
  const user = await db.users.findUnique({
    where: {
      email: email,
      role: "user",
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });
  return user;
};

export const GetUser = async (userId) => {
  const user = await db.users.findFirst({
    where: {
      id: userId,
      role: "user",
    },
  });
  return user;
};

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
