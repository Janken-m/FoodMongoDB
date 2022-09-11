const { Categories } = require("./models/Categories");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = await Categories.find();
  return res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Categories.findById(req.params.id);
  if (!category)
    return res.status(404).send("The Category with the given id is not found");

  return res.send(category);
});

router.post("/", (req, res) => {
  const { error } = validateCategory(req.body);

  if (error) return res.status(404).send(error.message);

  const category = new Categories({
    name: req.body.name,
  });
  category.save();
  return res.send(category);
});

function validateCategory(category) {
  const Schema = Joi.object({
    name: Joi.string().required(),
  });
  return Schema.validate(category);
}
module.exports = router;
