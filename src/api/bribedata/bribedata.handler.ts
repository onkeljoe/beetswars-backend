import { Request, Response } from "express";

import { db } from "../../utils/database";
import logger from "../../utils/logger";
import { Bribedata } from "./bribedata.model";

const table = db.collection<Bribedata>("bribedata");

const readOne = async (key: string) => {
  const item = await table.get(key);
  const { created, updated, ...result } = item.props;
  return result as Bribedata;
};

export async function findOne(req: Request, res: Response) {
  try {
    const key = req.params.voteindex.toString();
    const result = await readOne(key);
    if (!result) throw new Error("No Object with given key found");
    res.json(result);
  } catch (error) {
    logger.error(error);
    return res.status(404).send(error);
  }
}

export async function insertBribe(req: Request, res: Response) {
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

export async function getList(req: Request, res: Response) {
  try {
    // get list
    // map
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertRound(req: Request, res: Response) {
  try {
    // insert
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertToken(req: Request, res: Response) {
  try {
    // insert
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}
