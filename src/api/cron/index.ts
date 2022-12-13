import express, { Request, Response } from "express";
// import chartdata from "./chartdata/chartdata.routes";

const router = express.Router();

router.get("/", (req: Request, res: Response<string>) => {
  return res.send("Welcome to API v1 Cronjobs");
});

// router.use("/chartdata", chartdata);

export default router;
