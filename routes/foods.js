const Joi = require("joi");
const express = require("express");
const { Foods } = require("../models/Foods");
const { Categories } = require("../models/Categories");

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

router.post("/", async (req, res) => {
  const { error } = validateFoods(req.body);

  if (error) return res.status(400).send(error.message);

  const category = await Categories.findById(req.params.id);

  const foodsIndb = new Foods({
    name: req.body.name,
    category: { _id: category._id, name: category.name },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  });
  foodsIndb.save();
  return res.send(foodsIndb);
});

router.put("/:id", async (req, res) => {
  const { error } = validateFoods(req.body);

  if (error) return res.status(400).send(error.message);

  const category = await Categories.findById(req.params.id);

  let food = Foods.findById(req.params.id);
  // or
  // let food = Foods.findByIdAndUpdate({  food.name = req.body.name;
  // food.category = { _id: category._id, name: category.name };
  // food.numberInStock = req.body.numberInStock;
  // food.price = req.body.price;})

  if (!food)
    return res.status(404).send("The food with the given id is not found");

  food.name = req.body.name;
  food.category = { _id: category._id, name: category.name };
  food.numberInStock = req.body.numberInStock;
  food.price = req.body.price;

  return res.send(food);
});

router.delete("/:id", async (req, res) => {
  const foods = await Foods.findByIdAndDelete(req.params.id);
  if (!foods)
    return res.status(404).send("The food with the given id is not found");

  return res.send(foods);
});

function validateFoods(food) {
  const schema = Joi.object({
    name: Joi.string().required(),
    category: { _id: Joi.allow(), name: Joi.required() },
    numberInStock: Joi.number().required(),
    price: Joi.number().required(),
  });

  return schema.validate(food);
}

module.exports = router;
