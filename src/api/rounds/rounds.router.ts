import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    round: 99,
    status: "pending",
  });
});

export default router;
