import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import instanceMongodb from "./dbs/init.mongodb.js";
import { checkOverLoad } from "./helpers/check.connect.js";
import router from "./routers/index.js";
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
instanceMongodb;
// checkOverLoad();

// init routes
app.use("", router);

// handle errors

export default app;
