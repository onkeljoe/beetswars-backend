import { config } from "../config";
import logger from "../logger";
const { MongoClient } = require("mongodb");
// const db = new MongoClient("config.");

export async function connect(
  table: string = "beetswars"
): Promise<any | null> {
  // db.connect();
  logger.info("Connected to Database");
  return null;
}

export async function readOne<T>(
  collection: string,
  key: string
): Promise<T | null> {
  //   const coll = db.collection<T>(table);
  //   const item = await coll.get(key);
  //   if (!item) return null;
  //   const { created, updated, ...result } = item.props;
  //   return result as T;
  return null;
}

export async function readAll<T>(collection: string): Promise<T[] | null> {
  return null;
}

export async function readList(
  collection: string,
  field: string
): Promise<string[]> {
  return [];
}

export async function insert<T>(
  collection: string,
  dbkey: string,
  payload: T
): Promise<T | null> {
  return null;
}

export async function remove<T>(
  collection: string,
  key: string
): Promise<boolean> {
  return false;
}
