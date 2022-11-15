import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import logger from "./utils/logger";
import { config } from "./utils/config";
import { connectToDb, disconnectFromDb } from "./utils/database";

async function serverShutdown() {
  await httpserver.close(() => logger.info("HTTP server closed"));
  disconnectFromDb();
  logger.info("Shut down gracefully");
}

export const db = (async () => await connectToDb())();

const app = express();

app.use(helmet()); // add security layer
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // allow JSON in POST

routes(app);

const httpserver = app.listen(config.port, config.host, () => {
  logger.info(`App listening at http://${config.host}:${config.port}`);
});

process.on("SIGTERM", serverShutdown);
process.on("SIGINT", serverShutdown);
process.on("SIGQUIT", serverShutdown);
process.on("SIGUSR2", serverShutdown); // for nodemon
