const mongoose = require("mongoose");
const { categoriesSchema } = require("../models/Categories");
const Joi = require("joi");

const foodsSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: categoriesSchema,
  numberInStock: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Foods = mongoose.model("food", foodsSchema);

function validateFoods(food) {
  const schema = Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    price: Joi.number().required(),
  });

  return schema.validate(food);
}

module.exports.Foods = Foods;
module.exports.validateFoods = validateFoods;
