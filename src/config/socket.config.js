import { Server } from "socket.io";
import logger from "./logger.config.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://josjis.rafn.tech"],
    },
  });

  io.on("connection", (socket) => {
    logger.info("websocket client connected:" + socket.id);

    // join room order
    socket.on("join:order", (orderId) => {
      socket.join(`order:${orderId}`);

      logger.info(`socket ${socket.id} join order:${orderId}`);
    });

    socket.on("disconnect", () => {
      logger.info("websocket client disconnected:" + socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};
