import * as repository from "./auth.repository.js";
import crypto from "crypto";

import { generateAccessToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";

export const createGuest = async (userAgent, userIp) => {
  const guest = await repository.createGuest(userAgent, userIp);
  const accessToken = generateAccessToken(guest.id, guest.role);
  return { accessToken, guest_id: guest.guest_id };
};

export const getGuest = async (guestId) => {
  const guest = await repository.getGuest(guestId);
  return guest;
};

export const guestRefreshToken = async (guestId) => {
  const guest = await repository.findGuestId(guestId);
  const accessToken = generateAccessToken(guest.id, guest.role);
  return accessToken;
};

export const createUser = async (
  userId,
  name,
  email,
  password,
  userAgent,
  userIp,
) => {
  const isGuest = await repository.getGuest(userId);

  if (!isGuest) {
    throw new Error("User is not a guest or already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await repository.createUser(
    userId,
    name,
    email,
    hashedPassword,
    userAgent,
    userIp,
  );

  return user;
};

export const LoginUser = async (email, password) => {
  const refreshTokenGenerated = crypto.randomBytes(64).toString("hex");
  const user = await repository.getUserCredential(email);
  const refreshToken = await repository.createUserRefreshToken(
    user.id,
    refreshTokenGenerated,
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id, user.role);
  return { userId: user.id, accessToken, refreshToken: refreshToken };
};

export const getUser = async (userId) => {
  const user = await repository.GetUser(userId);
  return user;
};

export const getRefreshToken = async (refreshToken) => {
  const userRefreshToken = await repository.getUserRefreshToken(refreshToken);
  if (!userRefreshToken) {
    throw new Error("Invalid or expired refresh token");
  }
  const accessToken = generateAccessToken(userRefreshToken.user_id, "user");
  return accessToken;
};

export const deleteRefreshToken = async (userId) => {
  await repository.deleteRefreshToken(userId);
};

export const LoginAdmin = async (email, password) => {
  const refreshTokenGenerated = crypto.randomBytes(64).toString("hex");
  const user = await repository.getAdminCredential(email);
  const refreshToken = await repository.createUserRefreshToken(
    user.id,
    refreshTokenGenerated,
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id, user.role);
  return { userId: user.id, accessToken, refreshToken: refreshToken };
};

export const getAdmin = async (adminId) => {
  const admin = await repository.GetAdmin(adminId);
  return admin;
};
