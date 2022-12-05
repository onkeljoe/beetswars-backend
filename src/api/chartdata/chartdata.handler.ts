import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { db } from "../../utils/database";
import logger from "../../utils/logger";
import { Chartdata } from "./chartdata.model";

const table = db.collection<Chartdata>("chartdata");

const readOne = async (key: string) => {
  const item = await table.get(key);
  const { created, updated, ...result } = item.props;
  return result as Chartdata;
};

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const chartdata = await table.list();
    if (!chartdata) throw new Error("Cannot load Chartdata from Database");
    // @ts-ignore
    const keys = chartdata.results.map((item) => item["key"]) as string[];
    const result = await Promise.all(keys.map((key) => readOne(key)));
    res.json({ chartdata: result });
  } catch (error) {
    logger.error(error);
    return res.status(404).send(error);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const key = req.params.round;
    const result = await readOne(key);
    if (!result) throw new Error("No Object with given ID found");
    res.json({ chartdata: result });
  } catch (error) {
    logger.error(error);
    return res.status(404).send(error);
  }
}

export async function insert(req: Request, res: Response, next: NextFunction) {
  const key = req.params.round;
  try {
    const payload = Chartdata.parse(req.body);
    const result = await table.set(key, payload);
    if (!result) throw new Error("Error inserting Chartdata");
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(error);
      return res.status(422).send(error);
    }
    logger.error(error);
    return res.status(400).send(error);
  }
}
