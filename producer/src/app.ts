import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import expressWinston from "express-winston";

const port = Number(process.env.PORT ?? 3000);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
});

const app = express();

app.use(bodyParser.json());
app.use(
  expressWinston.logger({
    winstonInstance: logger
  })
);

app.listen(port, "0.0.0.0", () => {
  logger.info(`Producer listening on port ${port}...`);
});
