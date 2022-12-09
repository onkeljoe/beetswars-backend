import { Request, Response } from "express";

import { db } from "../../utils/database";
import logger from "../../utils/logger";
import { Bribefile } from "./bribedata.model";

const baseurl = "https://beetswars-backend.cyclic.app/API/v1/bribedata/";

const table = db.collection<Bribefile>("bribedata");

const readOne = async (key: string) => {
  const item = await table.get(key);
  const { created, updated, ...result } = item.props;
  return result as Bribefile;
};

export async function findOne(req: Request, res: Response) {
  try {
    const key = req.params.round.toString();
    const result = await readOne(key);
    if (!result) throw new Error("No Object with given key found");
    return res.json(result);
  } catch (error) {
    logger.error(error);
    return res.status(404).send(error);
  }
}

export async function insertBribe(req: Request, res: Response) {
  return res.send("not implemented yet");
  try {
    const round = req.params.round.toString();
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
    const bribeRounds = await table.list();
    if (!bribeRounds) return res.status(404).send("not found");
    console.log(bribeRounds);
    // @ts-ignore
    const keylist = bribeRounds.results.map((x) => x.key) as string[];
    const urllist = keylist.map((x) => ({ key: x, url: `${baseurl}${x}` }));
    return res.send(urllist);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertRound(req: Request, res: Response) {
  try {
    const round = req.params.round.toString();
    const payload = Bribefile.parse(req.body);
    const result = await table.set(round, payload);
    if (!result) throw new Error("Error inserting Bribedata");
    return res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertToken(req: Request, res: Response) {
  return res.send("not implemented yet");
  try {
    const round = req.params.round.toString();
    const token = req.params.key.toString();
    // insert
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}
