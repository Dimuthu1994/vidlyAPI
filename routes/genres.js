const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
//express() not work so we need .Router()
// when we seperate routes

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID is not found");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });

  await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  //validate
  //if invalide return 400 bad req
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
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

router.delete("/:id", auth, async (req, res) => {
  //look up the genres
  //if not exist return 404
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("The genre with given id not found");

  //return the delete genre
  res.send(genre);
});

module.exports = router;
