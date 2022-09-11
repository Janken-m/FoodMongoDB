const mongoose = require("mongoose");
const { categoriesSchema } = require("../models/Categories");

const foodsSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: categoriesSchema,
  numberInStock: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Foods = mongoose.model("food", foodsSchema);

module.exports.Foods = Foods;
