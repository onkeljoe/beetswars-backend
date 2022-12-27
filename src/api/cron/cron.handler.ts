import { Request, Response } from "express";
import { readOne } from "../../utils/database";
import logger from "../../utils/logger";
import { Chartdata } from "../chartdata/chartdata.model";
import { getData } from "./cron.helper";

// @ts-ignore
import cyclicdb from "cyclic-dynamodb";
import { config } from "../../utils/config";
export const db = cyclicdb(config.dbTable);

// todo: remove 3 lines above

const chartTable = db.collection<Chartdata>("chartdata");

export async function insertVoteEnd(req: Request, res: Response) {
  const round = await readOne<{ key: string }>("latest", "latestkey");
  if (!round) return;
  const newRound = await getData(round.key);
  if (Math.floor(Date.now() / 1000) < newRound.voteEnd) {
    const myvalue = {
      error: "too early, did not write to database",
      value: newRound,
    };
    return res.status(400).json(myvalue);
  }
  logger.info("Vote End recorded");
  const checkChartdataEntry = await readOne<Chartdata>("chartdata", round.key);
  if (checkChartdataEntry) return res.status(409).send("duplicate entry");
  const result = await chartTable.set(round.key, newRound);
  if (!result) res.status(500).send("Error inserting Chartdata");
  // const result = { props: newRound };
  return res.status(201).json(result.props);
}

// "chartdata": {
//         "bribedVotes": 41659692,
//         "round": "26",
//         "voteEnd": 1671987600,
//         "totalBribes": 10714,
//         "totalBriber": 4,
//         "priceFbeets": 0.04402805659279031,
//         "priceBeets": 0.03564498394569577,
//         "totalVoter": 539,
//         "totalVotes": 59005417
//     }
