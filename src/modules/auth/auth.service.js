import * as repository from "./auth.repository.js";
import crypto from "crypto";

import { generateAccessToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";

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
