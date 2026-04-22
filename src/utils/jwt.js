import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};
