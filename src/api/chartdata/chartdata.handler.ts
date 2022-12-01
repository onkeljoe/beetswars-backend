import { Request, Response, NextFunction } from "express";

import { db } from "../../utils/database";
import { Chartdata } from "./chartdata.model";

const table = db.collection<Chartdata>("chartdata");

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const chartdata = await table.list(); //.toArray();
    console.log("chartdata round ", chartdata.key);
    console.log(chartdata.results);
    res.json(chartdata);
  } catch (error) {
    next(error);
  }
}

export async function insert(req: Request, res: Response, next: NextFunction) {
  try {
    const key = req.params.round;
    // TODO: check req.body isvalid
    const payload = req.body;
    console.log(payload);
    const result = await table.set(key, payload);
    if (!result) throw new Error("Error inserting Chartdata");
    res.status(201);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const key = req.params.round;

    const result = await table.get(key);
    if (!result) {
      res.status(404);
      throw new Error("No Object with given ID found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}
