import cors from "cors";

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:" + process.env.PORT];

const corsOptions = {
  origin: allowedOrigins, // Allowed origins
  methods: "GET,PUT,POST,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
  credentials: true,
};

export default cors(corsOptions);
