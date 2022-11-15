import { config } from "./config";
import logger from "./logger";

import { MongoClient } from "mongodb";

const client = new MongoClient(config.databaseUrl);
export const db = client.db(config.dbName);

export async function connectToDb() {
  try {
    await client.connect();
    logger.info("Connected to Database");
  } catch (error) {
    logger.error(error);
    process.exitCode = 1;
  }
}

export function disconnectFromDb() {
  logger.info("Disconnect from Database");
  return client.close();
}
