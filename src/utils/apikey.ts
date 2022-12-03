import { Request, Response, NextFunction } from "express";
import logger from "./logger";
import { apikeys } from "./database";

export async function checkApikey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "GET") {
    next();
  } else {
    const apikey = req.header("x-api-key");
    const validkeys = await apikeys();
    if (apikey && validkeys.indexOf(apikey) > -1) {
      logger.info("Valid API-key found");
      next();
    } else {
      logger.warn("no or invalid API key");
      res.status(403).send({ message: "not allowed" });
    }
  }
}
