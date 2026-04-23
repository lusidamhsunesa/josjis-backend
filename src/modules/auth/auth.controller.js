import * as service from "./auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import { setCookies } from "../../utils/cookies.js";
import { cookiesDuration } from "../../config/cookiesDuration.config.js";
import * as validation from "./auth.validation.js";

export const getRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    const token = await service.getRefreshToken(refreshToken);
    return successResponse(res, "Refresh token retrieved successfully", {
      token: token,
    });
  } catch (error) {
    return errorResponse(
      res,
      error,
      "Failed to retrieve refresh token",
      null,
      500,
    );
  }
};

export const deleteRefreshToken = async (req, res) => {
  try {
    const userId = req.user.id;
    await service.deleteRefreshToken(userId);
    return successResponse(
      res,
      "Refresh token deleted successfully",
      null,
      200,
    );
  } catch (error) {
    return errorResponse(
      res,
      error,
      "Failed to delete refresh token",
      null,
      500,
    );
  }
};

export const LoginAdmin = async (req, res) => {
  try {
    const { error, value } = validation.loginSchema.validate(req.body);

    if (error) {
      return errorResponse(res, error.details[0].message, null, 422);
    }

    const { email, password } = req.body;
    const { userId, accessToken, refreshToken } = await service.LoginAdmin(
      email,
      password,
    );
    setCookies(res, "access_token", accessToken, cookiesDuration.accessToken);
    setCookies(
      res,
      "refresh_token",
      refreshToken,
      cookiesDuration.refreshToken,
    );

    return successResponse(res, "Admin logged in successfully", {
      user_id: userId,
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return errorResponse(res, error, "Failed to login admin", null, 500);
  }
};

export const getAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await service.getAdmin(adminId);
    if (!admin) {
      return errorResponse(res, "Admin not found", null, 404);
    }
    return successResponse(res, "Admin retrieved successfully", admin, 200);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve admin", null, 500);
  }
};
