const Joi = require("joi");
const express = require("express");

const router = express.Router();

const Foods = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Apple",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 6,
    price: 10,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Banana",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 5,
    price: 15,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "Cucumber",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 8,
    price: 7,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "Chips",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 12,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    name: "Cookies",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 8,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    name: "Muffins",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 13,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    name: "Carrot",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 7,
    price: 7,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    name: "Sallad",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 4,
    price: 14,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    name: "Orange",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 7,
    price: 20,
  },
];

router.get("/", (req, res) => {
  return res.send(Foods);
});

router.get("/:id", (req, res) => {
  const foods = Foods.find((food) => food._id === req.params.id);
  if (!foods)
    return res.status(404).send("The food with the given id is not found");

  return res.send(foods);
});

router.post("/", (req, res) => {
  const { error } = validateFoods(req.body);

  if (error) return res.status(400).send(error.message);
  const foods = {
    _id: "1",
    name: req.body.name,
    category: { _id: "1", name: req.body.category.name },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  };

  Foods.push(foods);
  return res.send(foods);
});

router.put("/:id", (req, res) => {
  const { error } = validateFoods(req.body);

  if (error) return res.status(400).send(error.message);

  let foods = Foods.find((food) => food._id === req.params.id);

  if (!foods)
    return res.status(404).send("The food with the given id is not found");

  foods.name = req.body.name;
  foods.category = { _id: "", name: req.body.category.name };
  foods.numberInStock = req.body.numberInStock;
  foods.price = req.body.price;

  return res.send(foods);
});

router.delete("/:id", (req, res) => {
  const foods = Foods.find((food) => food._id === req.params.id);
  if (!foods)
    return res.status(404).send("The food with the given id is not found");

  const index = Foods.indexOf(foods);
  Foods.splice(index, 1);

  return res.send(foods);
});

function validateFoods(food) {
  const schema = Joi.object({
    _id: Joi.allow(),
    name: Joi.string().required(),
    category: { _id: Joi.allow(), name: Joi.required() },
    numberInStock: Joi.number().required(),
    price: Joi.number().required(),
  });

  return schema.validate(food);
}

module.exports = router;
