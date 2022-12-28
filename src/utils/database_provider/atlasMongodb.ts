import { config } from "../config";
import logger from "../logger";
import { Provider } from "./provider.interface";
const { MongoClient } = require("mongodb");
// const db = new MongoClient("config.");

const mongoProvider: Provider = {
  async connect(table: string = "beetswars"): Promise<any | null> {
    // db.connect();
    logger.info("Connected to Database");
    return null;
  },

  async readOne<T>(collection: string, key: string): Promise<T | null> {
    //   const coll = db.collection<T>(table);
    //   const item = await coll.get(key);
    //   if (!item) return null;
    //   const { created, updated, ...result } = item.props;
    //   return result as T;
    return null;
  },

  async readAll<T>(collection: string): Promise<T[] | null> {
    return null;
  },

  async readList(collection: string, field: string): Promise<string[]> {
    return [];
  },

  async insert<T>(
    collection: string,
    dbkey: string,
    payload: T
  ): Promise<T | null> {
    return null;
  },

  async remove<T>(collection: string, key: string): Promise<boolean> {
    return false;
  },
};

export default mongoProvider;
