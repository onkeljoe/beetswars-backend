import { Request, Response } from "express";
// import { z, ZodError } from "zod";

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
  console.log("newRound: ", newRound);
  logger.info("Vote End recorded");
  return res.send("OK");
}
