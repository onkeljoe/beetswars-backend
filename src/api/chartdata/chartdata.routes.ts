import express, { Request, Response } from "express";
import * as ChartdataHandlers from "./chartdata.handler";

const router = express.Router();

router.get("/", ChartdataHandlers.findAll);
// router.get("/:id", )
router.post("/:round", ChartdataHandlers.insert);

export default router;
