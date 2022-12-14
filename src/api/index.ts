import express, { Request, Response } from "express";
import bribedata from "./bribedata/bribedata.routes";
import chartdata from "./chartdata/chartdata.routes";
import cron from "./cron/cron.routes";

const router = express.Router();

router.get("/", (req: Request, res: Response<string>) => {
  return res.send("Welcome to API v1");
});

router.get("/healthcheck", (req: Request, res: Response<string>) => {
  return res.send("alive");
});

router.use("/bribedata", bribedata);
router.use("/chartdata", chartdata);
router.use("/cron", cron);

export default router;
