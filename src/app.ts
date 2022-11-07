import express, { Request, Response } from "express";
import routes from "./routes";
import helmet from "helmet";

const port = 3030;
const app = express();

app.use(helmet);
app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
