const express = require("express");
const { Foods, validateFoods } = require("../models/Foods");
const { Categories } = require("../models/Categories");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/", async (req, res) => {
  const foods = await Foods.find();
  return res.send(foods);
});

router.get("/:id", async (req, res) => {
  const food = await Foods.findById(req.params.id);
  if (!food)
    return res.status(404).send("The food with the given id is not found");

  return res.send(food);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validateFoods(req.body);

  if (error) return res.status(400).send(error.message);
  const category = await Categories.findById(req.body.categoryId);

<<<<<<< HEAD
  if (!category)
    return res.status(400).send("Can not found category with that given id.");
=======
  const category = await Categories.findById(req.body.categoryId);
  if (!category)
    return res.status(404).send("There is no category with that Id");
>>>>>>> 1b24dab19739dbea56ef47d50d3e64e49745a60e

  const foodsIndb = new Foods({
    name: req.body.name,
    category: { _id: category._id, name: category.name },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  });
  await foodsIndb.save();
  return res.send(foodsIndb);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validateFoods(req.body);

  if (error) return res.status(400).send(error.message);

  const category = await Categories.findById(req.body.categoryId);
  //query update
  // let food = await Foods.findById(req.params.id);

  // update first
  let food = Foods.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    category: { _id: category._id, name: category.name },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  });

  if (!food)
    return res.status(404).send("The food with the given id is not found");

  // food.name = req.body.name;
  // food.category = { _id: category._id, name: category.name };
  // food.numberInStock = req.body.numberInStock;
  // food.price = req.body.price;

  await food.save();

  return res.send(food);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const foods = await Foods.findByIdAndDelete(req.params.id);
  if (!foods)
    return res.status(404).send("The food with the given id is not found");

  return res.send(foods);
});

module.exports = router;
