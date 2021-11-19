const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();

app.use(helmet());
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

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
