import { Request, Response } from "express";
import { insert, readOne } from "../../utils/database";
import logger from "../../utils/logger";
import { Chartdata } from "../chartdata/chartdata.model";
import { getData } from "./cron.helper";

export async function insertVoteEnd(req: Request, res: Response) {
  const round = await readOne<{ key: string }>("latest", "latestkey");
  if (!round) return;
  const key = round.key;
  const newRound = await getData(key);
  if (Math.floor(Date.now() / 1000) < newRound.voteEnd) {
    const myvalue = {
      error: "too early, did not write to database",
      value: newRound,
    };
    return res.status(400).json(myvalue);
  }
  logger.info(`Vote End recorded round ${key}`);
  // const checkChartdataEntry = await readOne<Chartdata>("chartdata", round.key);
  // if (checkChartdataEntry) return res.status(409).send("duplicate entry");
  const result = await insert<Chartdata>("chartdata", key, newRound);
  if (!result) return res.status(500).send("Error inserting Chartdata");
  // const result = newRound;
  return res.status(201).json(result);
}
