import * as service from "./auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import { setCookies } from "../../utils/cookies.js";
import { cookiesDuration } from "../../config/cookiesDuration.config.js";

// Guest
export const createGuest = async (req, res) => {
  try {
    const userAgent = req.headers["user-agent"];
    const userIp = req.ip;
    const guest = await service.createGuest(userAgent, userIp);
    setCookies(
      res,
      "access_token",
      guest.accessToken,
      cookiesDuration.accessToken,
    );
    setCookies(res, "guest_id", guest.guest_id, cookiesDuration.guestId);

    return successResponse(
      res,
      "Guest created successfully",
      {
        guest_id: guest.guest_id,
        token: guest.accessToken,
      },
      201,
    );
  } catch (error) {
    return errorResponse(res, error, "Failed to create guest", null, 500);
  }
};

export const getGuest = async (req, res) => {
  try {
    const guestId = req.user.id;
    const guest = await service.getGuest(guestId);
    if (!guest) {
      return errorResponse(res, guest, "Guest not found", null, 404);
    }
    return successResponse(res, "Guest retrieved successfully", guest);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve guest", null, 500);
  }
};

export const guestRefreshToken = async (req, res) => {
  try {
    const guestId = req.cookies.guest_id;
    const accessToken = await service.guestRefreshToken(guestId);
    setCookies(res, "access_token", accessToken, cookiesDuration.accessToken);

    return successResponse(res, "Token refreshed successfully", {
      token: accessToken,
    });
  } catch (error) {
    return errorResponse(res, error, "Failed to refresh token", null, 500);
  }
};

export const createUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    const userAgent = req.headers["user-agent"];
    const userIp = req.ip;

    const user = await service.createUser(
      userId,
      name,
      email,
      password,
      userAgent,
      userIp,
    );

    if (!user) {
      return errorResponse(res, "Failed to create user", null, 400);
    }

    return successResponse(res, "User created successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, error, "Failed to create user", null, 500);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { userId, accessToken, refreshToken } = await service.LoginUser(
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

    return successResponse(res, "User logged in successfully", {
      user_id: userId,
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return errorResponse(res, error, "Failed to login user", null, 500);
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await service.getUser(userId);
    if (!user) {
      return errorResponse(res, "User not found", null, 404);
    }
    return successResponse(res, "User retrieved successfully", user, 200);
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve user", null, 500);
  }
};

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
    const { email, password } = req.body;
    const { userId, accessToken, refreshToken } = await service.LoginAdmin(
      email,
      password,
    );
    setCookies(res, "admin_token", accessToken, cookiesDuration.accessToken);
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
