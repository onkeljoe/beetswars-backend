import { config } from "./config";
import logger from "./logger";
// @ts-ignore
import cyclicdb from "cyclic-dynamodb";

logger.info("Connected to Database");
export const db = cyclicdb(config.dbTable);
