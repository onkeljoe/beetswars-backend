import { Express, Request, Response, NextFunction } from "express";

function routes(app: Express) {
  app.get("/api/v1/health", (req: Request, res: Response) => {
    return res.send("alive");
  });

  app.get("/api/v1/rounds", (req: Request, res: Response) => {
    console.log(req.body);

    return res.sendStatus(200);
  });

  app.get("/api/v1/bribedata/round", (req: Request, res: Response) => {
    res.json({
      round: 99,
      status: "pending",
    });
  });

  app.get("/api/v1/chartdata", (req: Request, res: Response) => {
    console.log(req.body);

    return res.sendStatus(200);
  });

  app.all("/", (req: Request, res: Response) => {
    return res.send("Nothing to see here");
  });
}

export default routes;
