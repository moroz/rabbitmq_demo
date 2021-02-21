import express from "express";
import bodyParser from "body-parser";
import expressWinston from "express-winston";
import logger from "./logger";

const port = Number(process.env.PORT ?? 3000);

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
