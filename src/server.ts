
import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";
import config from "./config";

let server: Server;

const main = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log("[database]: Connected to MongoDB");

    // Start the server
    server = app.listen(config.port, () => {
      console.log(`[server]: Server is running at http://localhost:${config.port}`);
    });

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("[server]: Received SIGINT. Shutting down gracefully...");
      await shutdown();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("[server]: Received SIGTERM. Shutting down gracefully...");
      await shutdown();
      process.exit(0);
    });

    // Handle unhandled rejections
    process.on("unhandledRejection", (reason) => {
      console.error("[server]: Unhandled Rejection", reason);
      shutdown().finally(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("[server]: Uncaught Exception", err);
      shutdown().finally(() => process.exit(1));
    });

  } catch (err) {
    console.error("[server]: Failed to start the server", err);
    process.exit(1);
  }
};

// Graceful Shutdown Function
const shutdown = async () => {
  try {
    // Close server
    if (server) {
      console.log("[server]: Closing HTTP server...");
      server.close();
    }

    // Disconnect from MongoDB
    console.log("[database]: Disconnecting from MongoDB...");
    await mongoose.disconnect();

    console.log("[server]: Shutdown complete.");
  } catch (err) {
    console.error("[server]: Error during shutdown", err);
  }
};

main().catch((err) => {
  console.error("[main]: Fatal error during initialization.", err);
  process.exit(1);
});

export default app;


