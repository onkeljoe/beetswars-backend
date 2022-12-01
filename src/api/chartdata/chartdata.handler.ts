import { Request, Response, NextFunction } from "express";

import { db } from "../../utils/database";
import { Chartdata } from "./chartdata.model";

const table = db.collection<Chartdata>("chartdata");

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const chartdata = await table.list();   //.toArray();
    console.log(chartdata);
    res.json(chartdata);
  } catch (error) {
    next(error);
  }
}

export async function insert(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const key=req.params.key;
    // TODO: check req.body isvalid
    const result = await table.set(key, req.body);
    if (!result) throw new Error("Error inserting Chartdata");
    res.status(201);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
}

// export async function findOne(req: Request, res: Response, next: NextFunction) {
//   try {
//     const sid = new ObjectId(req.params.id);
//     const result = await table.findOne({ _id: sid });
//     if (!result) {
//       res.status(404);
//       throw new Error("No Object with given ID found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// }
