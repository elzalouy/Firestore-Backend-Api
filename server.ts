import express from "express";
import winston from "winston";
import morgan from "morgan";
import config from "config";
import configuration from "./src/startup/configuration";
import db from "./src/startup/db";
import prod from "./src/startup/prod";
import logger from "./src/startup/logger";
import routes from "./src/startup/routes";

const app = express();
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const DB = db();
logger();
configuration();
prod(app);
routes(app);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  try {
    console.log(config.get("name"));
    console.log(`listenin to port ${port}`);
  } catch (ex: any) {
    console.log(ex.message);
    winston.error(ex.message, ex);
  }
});
export const FireStore = DB;
export default server;
