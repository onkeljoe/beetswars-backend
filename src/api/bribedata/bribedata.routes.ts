import express from "express";
import * as BribedataHandlers from "./bribedata.handler";

const router = express.Router();

router.get("/list", BribedataHandlers.getList);
router.get("/:round", BribedataHandlers.findOne);
router.post("/:round", BribedataHandlers.insertRound);
router.post("/:round/:bribe", BribedataHandlers.insertBribe);
router.post("/token/:key", BribedataHandlers.insertToken);

export default router;
