import express from "express";
import * as BribedataHandlers from "./bribedata.handler";

const router = express.Router();

router.get("/", BribedataHandlers.getList);
router.get("/list", BribedataHandlers.getList);
router.get("/latest", BribedataHandlers.findLatest);
router.get("/:round", BribedataHandlers.findOne);
router.post("/:round", BribedataHandlers.insertRound);
router.post("/latest/:round", BribedataHandlers.setLatest);
router.post("/:round/:voteindex", BribedataHandlers.insertBribe);
router.post("/token/:round/:key", BribedataHandlers.insertToken);
router.delete("/:round", BribedataHandlers.deleteRound);

export default router;
