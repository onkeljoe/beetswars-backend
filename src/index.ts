import express, { Request, Response } from "express";
import logger from "./utils/logger";
import { config } from "./utils/config";
import { db } from "./utils/database";
import { checkApikey } from "./utils/apikey";

import helmet from "helmet";
import cors from "cors";
import api from "./api";

const app = express();
const myDb = db;
logger.info(`DB: ${typeof myDb}`);

//einmal
// const table = myDb.collection("validkeys");
// async () =>
//   await table.set(
//     "keys",
//     "{keys: ['hkX_yhgdSJRT57x','DF2g2x2f_EXp9nS','5WKd37eED-h9Wiz','f_RDj-XR3TCg7wm']"
//   )();

app.use(helmet()); // add security layer
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // allow JSON in POST

app.get("/", (req: Request, res: Response<string>) => {
  return res.send("Nothing to see here.");
});

app.use("/api", checkApikey);
app.use("/api/v1", api);

app.listen(config.port, config.host, () => {
  logger.info(`App listening at http://${config.host}:${config.port}`);
});
