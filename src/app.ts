import express, { Request, Response } from "express";

const port = 3030;
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
