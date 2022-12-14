import { config } from "./config";
import logger from "./logger";
// @ts-ignore
import cyclicdb from "cyclic-dynamodb";

logger.info("Connected to Database");
export const db = cyclicdb(config.dbTable);

export async function apikeys() {
  const table = db.collection<string>("apikeys");
  const list = await table.get("keys");
  const { updated, created, ...validkeylist } = list.props;
  const keys = Object.keys(validkeylist).map(
    (key) => validkeylist[key]
  ) as string[];
  return keys;
}

export async function readOne<T>(table: string, key: string) {
  const coll = db.collection<T>(table);
  const item = await coll.get(key);
  if (!item) return null;
  const { created, updated, ...result } = item.props;
  return result as T;
}
