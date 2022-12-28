import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import logger from "./utils/logger";
import { config } from "./utils/config";
import { connect } from "./utils/database";
import { checkApikey } from "./utils/apikey";

import helmet from "helmet";
import cors from "cors";
import api from "./api";

const app = express();
var swaggerdoc;
try {
  swaggerdoc = yaml.load("dist/beetswars-API.yml");
  logger.info("dist");
} catch (error) {
  swaggerdoc = yaml.load("src/beetswars-API.yml");
  logger.info("src");
}

app.use(helmet()); // add security layer
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // allow JSON in POST

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerdoc));
app.get("/", (req: Request, res: Response<string>) => {
  return res.send("Nothing to see here.");
});

app.use("/api", checkApikey);
app.use("/api/v1", api);

(async () => {
  try {
    const db = await connect();
    // only run http server, if db connected successfully
    if (!db) process.exit(-1);
    app.listen(config.port, config.host, () => {
      logger.info(`App listening at http://${config.host}:${config.port}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(-1);
  }
})();
