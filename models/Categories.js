const mongoose = require("mongoose");
const Joi = require("joi");

const categoriesSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Categories = mongoose.model("Category", categoriesSchema);

function validateCategory(category) {
  const Schema = Joi.object({
    name: Joi.string().required(),
  });
  return Schema.validate(category);
}

module.exports.Categories = Categories;
module.exports.categoriesSchema = categoriesSchema;
module.exports.validateCategory = validateCategory;
