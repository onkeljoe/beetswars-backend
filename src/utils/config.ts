import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
const DATABASE_URL = process.env.DATABASE_URL || "";

export const config = {
  port: +PORT,
  host: HOST,
  databaseUrl: DATABASE_URL,
};