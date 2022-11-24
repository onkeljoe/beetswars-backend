"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = require("./utils/config");
const database_1 = require("./utils/database");
async function serverShutdown() {
    await httpserver.close(() => logger_1.default.info("HTTP server closed"));
    (0, database_1.disconnectFromDb)();
    logger_1.default.info("Shut down gracefully");
}
const httpserver = app_1.default.listen(config_1.config.port, config_1.config.host, () => {
    logger_1.default.info(`App listening at http://${config_1.config.host}:${config_1.config.port}`);
});
(0, database_1.connectToDb)();
process.on("SIGTERM", serverShutdown);
process.on("SIGINT", serverShutdown);
process.on("SIGQUIT", serverShutdown);
process.on("SIGUSR2", serverShutdown); // for nodemon
