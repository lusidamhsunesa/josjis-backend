export const cookiesDuration = {
  accessToken: process.env.ACCESS_TOKEN_EXPIRES_IN || 1,
  guestId: process.env.GUEST_ID_EXPIRES_IN || 720,
  refreshToken: process.env.REFRESH_TOKEN_EXPIRES_IN || 168,
  adminToken: process.env.ADMIN_TOKEN_EXPIRES_IN || 1,
};
