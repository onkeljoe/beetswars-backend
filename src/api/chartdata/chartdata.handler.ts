import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

import { db } from "../../utils/database";
import { Chartdata } from "./chartdata.model";

const table = db.collection<Chartdata>("chartdata");

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const chartdata = await table.find().toArray();
    res.json(chartdata);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await table.insertOne(req.body);
    if (!result.acknowledged) throw new Error("Error inserting Chartdata");
    res.status(201);
    res.json({ _id: result.insertedId, ...req.body });
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const sid = new ObjectId(req.params.id);
    const result = await table.findOne({ _id: sid });
    if (!result) {
      res.status(404);
      throw new Error("No Object with given ID found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}
