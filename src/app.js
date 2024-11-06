import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import instanceMongodb from "./dbs/init.mongodb.js";
import { checkOverLoad } from "./helpers/check.connect.js";

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
instanceMongodb;
checkOverLoad();

// init routes
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the API",
  });
});

// handle errors

export default app;
