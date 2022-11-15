import app from "./app";
import logger from "./utils/logger";
import { config } from "./utils/config";
import { connectToDb, disconnectFromDb } from "./utils/database";

async function serverShutdown() {
  await httpserver.close(() => logger.info("HTTP server closed"));
  disconnectFromDb();
  logger.info("Shut down gracefully");
}

const httpserver = app.listen(config.port, config.host, () => {
  logger.info(`App listening at http://${config.host}:${config.port}`);
});

connectToDb();

process.on("SIGTERM", serverShutdown);
process.on("SIGINT", serverShutdown);
process.on("SIGQUIT", serverShutdown);
process.on("SIGUSR2", serverShutdown); // for nodemon
