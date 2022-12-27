import { Request, Response } from "express";
import { ZodError } from "zod";
import logger from "../../utils/logger";
import { Bribefile, Bribedata, Tokendata } from "./bribedata.model";

const baseurl = "https://beetswars-backend.cyclic.app/API/v1/bribedata/";

// @ts-ignore
import cyclicdb from "cyclic-dynamodb";
import { config } from "../../utils/config";
export const db = cyclicdb(config.dbTable);

const table = db.collection<Bribefile>("bribedata");

const readOne = async (key: string) => {
  const item = await table.get(key);
  if (!item) return null;
  const { created, updated, ...result } = item.props;
  return result as Bribefile;
};

export async function getList(req: Request, res: Response) {
  try {
    const bribeRounds = await table.list();
    if (!bribeRounds) return res.status(404).send("not found");
    // @ts-ignore
    const keylist = bribeRounds.results.map((x) => x.key) as string[];
    const urllist = keylist.map((x) => ({ key: x, url: `${baseurl}${x}` }));
    return res.send(urllist);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const key = req.params.round.toString();
    const result = await readOne(key);
    if (!result) return res.status(404).send("No Object with given key found");
    return res.json(result);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
}

export async function findLatest(req: Request, res: Response) {
  try {
    const key = await db.collection("latest").get("latestkey");
    if (!key) return res.status(404).send("No key found");
    const result = await readOne(key.props.key);
    if (!result) return res.status(404).send("No Object with given key found");
    return res.json(result);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
}

export async function setLatest(req: Request, res: Response) {
  try {
    const key = req.params.round.toString();
    const check = await readOne(key);
    if (!check) return res.status(404).send("No such round found");
    const coll = db.collection("latest");
    await coll.set("latestkey", { key });
    return res.status(201).send("key set successfully");
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertBribe(req: Request, res: Response) {
  try {
    // get round data
    const round = req.params.round.toString();
    const previous = await readOne(round);
    if (!previous) return res.status(404).send("round does not exist");
    // parse payload from body
    const key = +req.params.voteindex;
    const payload = Bribedata.parse(req.body);
    if (payload.voteindex !== key) return res.status(400).send("key mismatch");
    // set new bribedata array
    const { bribedata, ...rest } = previous;
    const newBribedata = bribedata.filter((x) => x.voteindex !== +key);
    newBribedata.push(payload);
    const newRound = { ...rest, bribedata: newBribedata };
    // write back data
    const result = await table.set(round, newRound);
    if (!result) return res.status(500).send("Error inserting Bribedata");
    res.status(201).json(result.props);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(error);
      return res.status(422).send(error);
    }
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertRound(req: Request, res: Response) {
  try {
    const round = req.params.round.toString();
    const payload = Bribefile.parse(req.body);
    if (+round !== payload.round) return res.status(400).send("key mismatch");
    const result = await table.set(round, payload);
    if (!result) res.status(500).send("Error inserting Bribedata");
    return res.status(201).json(result.props);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(error);
      return res.status(422).send(error);
    }
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertToken(req: Request, res: Response) {
  // return res.send("not implemented yet");
  try {
    // get round data
    const round = req.params.round.toString();
    const previous = await readOne(round);
    if (!previous) return res.status(404).send("round does not exist");
    // parse payload from body
    const token = req.params.key.toString();
    const payload = Tokendata.parse(req.body);
    if (payload.token !== token) return res.status(400).send("key mismatch");
    // set new bribedata array
    const { tokendata, ...rest } = previous;
    const newTokendata = tokendata.filter((x) => x.token !== token);
    newTokendata.push(payload);
    const newRound = { ...rest, tokendata: newTokendata };
    // write back data
    const result = await table.set(round, newRound);
    if (!result) return res.status(500).send("Error inserting Tokendata");
    res.status(201).json(result.props);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(error);
      return res.status(422).send(error);
    }
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function deleteRound(req: Request, res: Response) {
  try {
    const round = req.params.round.toString();
    const result = await table.delete(round);
    if (!result) return res.status(500).send("could not delete");
    logger.info(`deleted round ${round} bribefile`);
    return res.send(`deleted round ${round}`);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}
