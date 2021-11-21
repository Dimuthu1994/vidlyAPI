require("express-async-errors");
const winston = require("winston");
const error = require("./middleware/error");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");

winston.handleException(
  new winston.transports.File({ filename: "uncaughtException.log" })
);
process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(winston.transports.File, { filename: "logfile.log" });

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR:jwtPrivateKey is not defined.");
  process.exit(1);
}

const p = Promise.reject(new Error("Something failed miserably"));
p.then(() => console.log("Done"));

app.use(helmet());
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error); //not calling passing ref to function

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
