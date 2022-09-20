const { Categories, validateCategory } = require("../models/Categories");
const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const category = await Categories.find().sort("name");
  return res.send(category);
});

router.get("/:id", [auth, admin], async (req, res) => {
  const category = await Categories.findById(req.params.id);
  if (!category)
    return res.status(404).send("The Category with the given id is not found");

  return res.send(category);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validateCategory(req.body);

  if (error) return res.status(404).send(error.message);

  const category = new Categories({
    name: req.body.name,
  });

  await category.save();
<<<<<<< HEAD
=======

>>>>>>> 1fe148f9c1ed202aa9fe7a82ea1bc9b2cf2cf822
  res.send(category);
});

module.exports = router;
