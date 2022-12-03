import { Request, Response, NextFunction } from "express";

import { db } from "../../utils/database";
import { Bribedata } from "./bribedata.model";

const table = db.collection<Bribedata>("bribedata");

const readOne = async (key: string) => {
  const item = await table.get(key);
  const { created, updated, ...result } = item.props;
  return result as Bribedata;
};

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const key = req.params.voteindex.toString();
    const result = await readOne(key);
    if (!result) throw new Error("No Object with given key found");
    res.json(result);
  } catch (error) {
    return res.status(404).send(error);
  }
}

export async function insert(req: Request, res: Response, next: NextFunction) {
  try {
    const key = req.params.voteindex.toString();
    // TODO: check if body is valild
    const payload = req.body;
    const result = await table.set(key, payload);
    if (!result) throw new Error("Error inserting Bribedata");
    res.status(201);
    res.json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
}
