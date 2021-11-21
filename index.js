require("express-async-errors");
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

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR:jwtPrivateKey is not defined.");
  process.exit(1);
}

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
