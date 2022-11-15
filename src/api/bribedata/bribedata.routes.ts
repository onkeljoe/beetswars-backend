import express, { Request, Response } from "express";

const router = express.Router();

type EmojiResponse = string[];

router.get<{}, EmojiResponse>("/", (req, res) => {
  res.json(["😀", "😳", "🙄"]);
});

router.get("/:round", (req: Request, res: Response) => {
  res.json({
    round: 99,
    status: "pending",
  });
});

export default router;
