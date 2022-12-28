import { Request, Response } from "express";
import { ZodError } from "zod";
import logger from "../../utils/logger";
import { Bribefile, Bribedata, Tokendata } from "./bribedata.model";
import { insert, readKeyList, readOne, remove } from "../../utils/database";

const baseurl = "https://beetswars-backend.cyclic.app/API/v1/bribedata/";

export async function getList(req: Request, res: Response) {
  try {
    const keylist = await readKeyList("bribedata");
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
    const result = await readOne<Bribefile>("bribedata", key);
    if (!result) return res.status(404).send("No Object with given key found");
    return res.json(result);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
}

export async function findLatest(req: Request, res: Response) {
  try {
    const key = await readOne<{ key: string }>("latest", "latestkey");
    if (!key) return res.status(404).send("No key found");
    const result = await readOne("bribedata", key.key);
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
    const check = await readOne<Bribefile>("bribedata", key);
    if (!check) return res.status(404).send("No such round found");
    const result = await insert<{ key: string }>("latest", "latestkey", {
      key,
    });
    if (!result) return res.status(500).send("Error writing to database");
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
    const previous = await readOne<Bribefile>("bribedata", round);
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
    const result = await insert<Bribefile>("bribedata", round, newRound);
    if (!result) return res.status(500).send("Error inserting Bribedata");
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

export async function insertRound(req: Request, res: Response) {
  try {
    const round = req.params.round.toString();
    const payload = Bribefile.parse(req.body);
    if (+round !== payload.round) return res.status(400).send("key mismatch");
    const result = await insert<Bribefile>("bribedata", round, payload);
    if (!result) res.status(500).send("Error inserting Bribedata");
    return res.status(201).json(result);
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
  try {
    // get round data
    const round = req.params.round.toString();
    const previous = await readOne<Bribefile>("bribedata", round);
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
    const result = await insert<Bribefile>("bribedata", round, newRound);
    if (!result) return res.status(500).send("Error inserting Tokendata");
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

export async function deleteRound(req: Request, res: Response) {
  try {
    const round = req.params.round.toString();
    const result = await remove("bribedata", round);
    if (!result) return res.status(500).send("could not delete");
    logger.info(`deleted round ${round} bribefile`);
    return res.send(`deleted round ${round}`);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}
