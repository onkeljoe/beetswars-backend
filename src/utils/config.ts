import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
// const DATABASE_URL = process.env.DATABASE_URL || "";
// const DB_NAME = process.env.DB_NAME || "";
const DB_TABLE = process.env.DB_TABLE || "";
const AWS_REGION = process.env.AWS_REGION || "";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN || "";

export const config = {
  port: +PORT,
  host: HOST,
  // databaseUrl: DATABASE_URL,
  // dbName: DB_NAME,
  dbTable: DB_TABLE,
  awsRegion: AWS_REGION,
  awsAccessKeyId: AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
  awsSessionToken: AWS_SESSION_TOKEN,
};
