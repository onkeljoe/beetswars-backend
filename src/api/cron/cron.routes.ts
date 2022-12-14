import express, { Request, Response } from "express";
import * as CronHandlers from "./cron.handler";

const router = express.Router();

router.get("/", (req: Request, res: Response<string>) => {
  res.status(403).send("not allowed");
});
router.post("/voteEnd", CronHandlers.insertVoteEnd);
// router.post("/everyMinuteVoteActive");

export default router;
