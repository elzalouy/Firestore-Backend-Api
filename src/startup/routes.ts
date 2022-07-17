import { Express } from "express";
import config from "config";
import Users from "../routes/Users";

export default (app: Express) => {
  app.use((req, res, next) => {
    let allowedOrigins = [
      "http://" + config.get("FrontEndUrl"),
      "https://" + config.get("FrontEndUrl"),
    ];
    let origin = req.headers.origin;
    if (allowedOrigins.includes(`${origin}`)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Key, x-auth-token, multipart/form-data"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, OPTIONS"
    );
    next();
  });
  app.use("/api/users/", Users);
};
