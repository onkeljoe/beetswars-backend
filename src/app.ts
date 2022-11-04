import express, { Request, Response } from "express";

const port = 3030;
const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
});

app.get("/health/", (req: Request, res: Response) => {
  return res.send("alive");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
