/**
 * This will establish a connection to the database - logging errors to the console.
 * The ‘console.log’ statements will trigger an eslint warning.
 * We can disable this in .eslintrc.json: "no-consol
 */

import * as dotenv from "dotenv";
import Mongoose from "mongoose";

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });
}
