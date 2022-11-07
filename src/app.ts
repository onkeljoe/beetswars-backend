import express from "express";
import routes from "./routes";
import helmet from "helmet";

const port = 3030;
const hostname = "0.0.0.0";
const app = express();

app.use(helmet());
app.use(express.json());

routes(app);

app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
