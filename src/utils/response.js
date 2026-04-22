// formatting success response
export const successResponse = (res, message, data = null, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    ...(data !== null && { data }),
  });
};

// formatting error response
export const errorResponse = (res, err, message, data = null, status = 400) => {
  const isDev = process.env.NODE_ENV === "dev";

  return res.status(status).json({
    success: false,
    message: message,
    ...(isDev && err && { error: err.message }),
    ...(data !== null && { data }),
  });
};
