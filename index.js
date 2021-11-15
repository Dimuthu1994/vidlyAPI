const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Thriller" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Horror" },
];
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  //look up the genres
  //if not exist return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The genre with given id not found");
  //validate
  //if invalide return 400 bad req
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //update genre
  //return the update genre
  genre.name = req.body.name;
  res.send(genre);
});

function validateGenre(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
