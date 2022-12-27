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
    const validkeylist: { [key: string]: string } | null = await readOne(
      "apikeys",
      "keys"
    );
    const validkeys: string[] = !validkeylist
      ? []
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
