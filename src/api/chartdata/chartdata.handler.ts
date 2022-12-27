import { Request, Response } from "express";
import { ZodError } from "zod";

import logger from "../../utils/logger";
import { Chartdata } from "./chartdata.model";
import { readAll, readOne, insert, remove } from "../../utils/database";

export async function findAll(req: Request, res: Response) {
  try {
    const result = await readAll("chartdata");
    if (!result)
      return res.status(500).send("Cannot load Chartdata from Database");
    return res.json({ chartdata: result });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const key = req.params.round;
    const result = await readOne("chartdata", key);
    if (!result) return res.status(404).send("No Object with given ID found");
    return res.json({ chartdata: result });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

export async function insertOne(req: Request, res: Response) {
  const key = req.params.round;
  try {
    const data = Chartdata.parse(req.body);
    const result = await insert<Chartdata>("chartdata", key, data);
    if (!result) res.status(500).send("Error inserting Chartdata");
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

export async function deleteRound(req: Request, res: Response) {
  try {
    const round = req.params.round.toString();
    const result = await remove("chartdata", round);
    if (!result) return res.status(500).send("could not delete");
    logger.info(`deleted round ${round} chartdata`);
    return res.send(`deleted round ${round}`);
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}
