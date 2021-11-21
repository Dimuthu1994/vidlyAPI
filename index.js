require("express-async-errors");
const winston = require("winston");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("./startup/routes")(app);
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);
process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(winston.transports.File, { filename: "logfile.log" });

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR:jwtPrivateKey is not defined.");
  process.exit(1);
}

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/vidlyApiMy");
    console.log("connected to MongoDB...");
  } catch (error) {
    console.log("could not connected to MongoDB", error);
  }
}
main();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
