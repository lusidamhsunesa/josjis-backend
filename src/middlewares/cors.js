import cors from "cors";

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:" + process.env.PORT, // Allow origins
  methods: "GET,PUT,POST,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
};

export default cors(corsOptions);
