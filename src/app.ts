import express from "express";
import helmet from "helmet";
import routes from "./routes";
import logger from "./utils/logger";

const port = 3030;
const hostname = "0.0.0.0";
// const logger = pino();
const app = express();

app.use(helmet());
app.use(express.json());

routes(app);

app.listen(port, hostname, () => {
  logger.info(`App listening at http://${hostname}:${port}`);
});
