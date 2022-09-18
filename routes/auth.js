const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  return res.send(token);
});

function validate(user) {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  return Schema.validate(user);
}

module.exports = router;
