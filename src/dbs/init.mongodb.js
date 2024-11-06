import mongoose from "mongoose";
import config from "../configs/config.mongodb.js";

const {
  db: { url, name, port },
} = config;

const connectString = `mongodb://${url}:${port}/${name}`;

import { countConnect } from "../helpers/check.connect.js";

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    //TODO: true for development, false for production
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    console.log(connectString);

    mongoose
      .connect(connectString, {
        maxPoolSize: 100,
      })
      .then(() => {
        console.log("Database connection successful", countConnect());
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

const instanceMongodb = Database.getInstance();
export default instanceMongodb;
