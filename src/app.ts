import express from "express";
import helmet from "helmet";
import routes from "./routes";
import logger from "./utils/logger";
import { config } from "./utils/config";

const app = express();

app.use(helmet()); // add security layer
app.use(express.json()); // allow JSON in POST

routes(app);

app.listen(config.PORT, config.HOST, () => {
  logger.info(`App listening at http://${config.HOST}:${config.PORT}`);
});
