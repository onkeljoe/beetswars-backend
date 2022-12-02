import { Request, Response, NextFunction } from "express";

import { db } from "../../utils/database";
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
    res.json(result);
  } catch (error) {
    return res.status(404).send(error);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const key = req.params.round;
    const result = await readOne(key);
    if (!result) throw new Error("No Object with given ID found");
    res.json(result);
  } catch (error) {
    return res.status(404).send(error);
  }
}

export async function insert(req: Request, res: Response, next: NextFunction) {
  try {
    const key = req.params.round;
    // TODO: check req.body isvalid
    const payload = req.body;
    const result = await table.set(key, payload);
    if (!result) throw new Error("Error inserting Chartdata");
    res.status(201);
    res.json(req.body);
  } catch (error) {
    return res.status(400).send(error);
  }
}
