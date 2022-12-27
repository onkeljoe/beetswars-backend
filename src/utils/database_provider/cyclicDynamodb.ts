import { config } from "../config";
import logger from "../logger";
// @ts-ignore
import cyclicdb from "cyclic-dynamodb";

let db: any;

export async function connect(
  table: string = config.dbTable
): Promise<any | null> {
  try {
    db = cyclicdb(table);
    logger.info("Connected to Database");
    return db;
  } catch (error) {
    return (db = null);
  }
}

export async function readOne<T>(
  collection: string,
  key: string
): Promise<T | null> {
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
}

export async function readAll<T>(table: string): Promise<T[] | null> {
  //   const data = await table.list();
  //     if (!chartdata)
  //       return res.status(500).send("Cannot load Chartdata from Database");
  //     // @ts-ignore
  //     const keys = chartdata.results.map((item) => item["key"]) as string[];
  //     const result = await Promise.all(keys.map((key) => readOne(key)));
  //     return res.json({ chartdata: result });
  //   } catch (error) {
  //     logger.error(error);
  //     return res.status(400).send(error);
  return null;
}

export async function readList(
  table: string,
  field: string
): Promise<string[]> {
  return [];
}

export async function insert<T>(key: string, value: T): Promise<T | null> {
  //    const key = req.params.round;
  //   try {
  //     const payload = Chartdata.parse(req.body);
  //     const result = await table.set(key, payload);
  //     if (!result) res.status(500).send("Error inserting Chartdata");
  //     return res.status(201).json(result);
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       logger.error(error);
  //       return res.status(422).send(error);
  //     }
  //     logger.error(error);
  //     return res.status(400).send(error);
  //   }
  return null;
}

export async function remove<T>(key: string): Promise<T | null> {
  //     const round = req.params.round.toString();
  //     const result = await table.delete(round);
  //     if (!result) return res.status(500).send("could not delete");
  //     logger.info(`deleted round ${round} chartdata`);
  //     return res.send(`deleted round ${round}`);
  //   } catch (error) {
  //     logger.error(error);
  //     return res.status(400).send(error);
  return null;
}
