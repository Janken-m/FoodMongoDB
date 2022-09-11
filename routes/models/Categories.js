const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  name: { type: String, required: true },
});

const Categories = mongoose.model("Category", categoriesSchema);

module.exports.Categories = Categories;
module.exports.categoriesSchema = categoriesSchema;
