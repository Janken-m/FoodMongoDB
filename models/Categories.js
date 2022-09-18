const mongoose = require("mongoose");
const Joi = require("joi");

const categoriesSchema = mongoose.Schema({
  name: {
    type: String,

    minlength: 2,
    maxlength: 50,
    required: true,
  },
});

const Categories = mongoose.model("category", categoriesSchema);

function validateCategory(category) {
  const Schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });
  return Schema.validate(category);
}

module.exports.Categories = Categories;
module.exports.categoriesSchema = categoriesSchema;
module.exports.validateCategory = validateCategory;
