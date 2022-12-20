import { Request, Response } from "express";

import { db, readOne } from "../../utils/database";
import logger from "../../utils/logger";
import { Chartdata } from "../chartdata/chartdata.model";
import { getData } from "./cron.helper";

const chartTable = db.collection<Chartdata>("chartdata");
type roundtype = { key: string };

export async function insertVoteEnd(req: Request, res: Response) {
  const round = await readOne<roundtype>("latest", "latestkey");
  if (!round) return;
  const newRound = await getData(round.key);
  logger.info("Vote End recorded");
  const checkChartdataEntry = await readOne<Chartdata>("chartdata", round.key);
  if (checkChartdataEntry) return res.status(409).send("duplicate entry");
  const result = await chartTable.set(round.key, newRound);
  if (!result) res.status(500).send("Error inserting Chartdata");
  return res.status(201).json(result.props);
}
