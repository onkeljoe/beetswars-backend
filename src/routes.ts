import { Express, Request, Response, NextFunction } from "express";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    return res.send("Nothing to see here");
  });

  app.get("/health/", (req: Request, res: Response) => {
    return res.send("alive");
  });

  app.get("/bribefile/", (req: Request, res: Response) => {
    res.json({
      round: 99,
      status: "pending",
    });
  });

  app.post("/api/data", (req: Request, res: Response) => {
    console.log(req.body);

    return res.sendStatus(200);
  });
}

export default routes;
