const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
//express() not work so we need .Router()
// when we seperate routes

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
});

const Genres = mongoose.model("Genre", genreSchema);

router.get("/", async (req, res) => {
  const genres = await Genres.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID is not found");
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genres({ name: req.body.name });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  //validate
  //if invalide return 400 bad req
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  //look up the genres
  //if not exist return 404
  if (!genre) return res.status(404).send("The genre with given id not found");
  //update genre
  //return the update genre
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  //look up the genres
  //if not exist return 404
  const genre = await Genres.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("The genre with given id not found");

  //return the delete genre
  res.send(genre);
});

function validateGenre(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

module.exports = router;
