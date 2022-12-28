import { Request, Response, NextFunction } from "express";
import logger from "./logger";
import { readOne } from "./database";

export async function checkApikey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "GET") {
    // no key needed to GET
    next();
  } else {
    const apikey = req.header("x-api-key");
    const validkeylist = await readOne<{ [key: string]: string }>(
      "apikeys",
      "keys"
    );
    const validkeys = !validkeylist
      ? ([] as string[])
      : Object.keys(validkeylist).map((key) => validkeylist[key]);
    if (apikey && validkeys.indexOf(apikey) > -1) {
      logger.info("Valid API-key found");
      next();
    } else {
      logger.warn("no or invalid API key");
      res.status(403).send({ message: "not allowed" });
    }
  }
}
