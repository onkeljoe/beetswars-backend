import pino from "pino";
import { pid } from "process";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "yyyy-mm-dd HH:MM:ss UTC",
      ignore: "pid,hostname",
    },
  },
});

export default logger;
