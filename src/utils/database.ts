import mongoose from "mongoose";
import { config } from "./config";
import logger from "./logger";

export async function connectToDb() {
  try {
    await mongoose.connect(config.databaseUrl);
    logger.info("Connected to database");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export function disconnectFromDb() {
  return mongoose.connection.close();
}
