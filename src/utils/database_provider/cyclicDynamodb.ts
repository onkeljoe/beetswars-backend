import { config } from "../config";
import logger from "../logger";
// @ts-ignore
import cyclicdb from "cyclic-dynamodb";
import { Provider } from "./provider.interface";

let db: any;

const dynamoProvider: Provider = {
  async connect(table: string = config.dbTable): Promise<any | null> {
    try {
      db = cyclicdb(table);
      logger.info("Connected to Database");
      return db;
    } catch (error) {
      logger.error(error);
      return (db = null);
    }
  },

  async readOne<T>(collection: string, key: string): Promise<T | null> {
    try {
      // @ts-ignore
      const coll = db.collection<T>(collection);
      const item = await coll.get(key);
      if (!item) return null;
      const { created, updated, ...result } = item.props;
      return result as T;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },

  async readAll<T>(collection: string): Promise<T[] | null> {
    try {
      // @ts-ignore
      const coll = db.collection<T>(collection);
      const data = await coll.list();
      if (!data) return null;
      // @ts-ignore
      const keys = data.results.map((item) => item["key"]) as string[];
      const result = await Promise.all(
        keys.map((key) => this.readOne(collection, key))
      );
      return result as T[];
    } catch (error) {
      logger.error(error);
      return null;
    }
  },

  async readList(collection: string, field: string): Promise<string[]> {
    const full = await this.readAll(collection);
    if (!full) return [];
    // @ts-ignore
    const result = full.map((x) => x[field].toString()) as string[];
    return result;
  },

  async insert<T>(
    collection: string,
    dbkey: string,
    payload: T
  ): Promise<T | null> {
    try {
      // @ts-ignore
      const coll = db.collection(collection);
      const result = await coll.set(dbkey, payload);
      if (!result) return null;
      return result.props as T;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },

  async remove<T>(collection: string, key: string): Promise<boolean> {
    try {
      // @ts-ignore
      const coll = db.collection<T>(collection);
      const result = (await coll.delete(key)) as boolean;
      return result;
    } catch (error) {
      logger.error(error);
      return false;
    }
  },
};

export default dynamoProvider;
