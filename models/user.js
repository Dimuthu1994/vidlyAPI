const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
