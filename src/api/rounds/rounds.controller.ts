import { NextFunction } from "express";
import logger from "../../utils/logger";

function getRoundListHandler(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    logger.error(error, "getRoundListHandlder: get");
  }
}
