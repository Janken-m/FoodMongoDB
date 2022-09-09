const express = require("express");
const router = express.Router();

const Categories = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
];

router.get("/", (req, res) => {
  return res.send(Categories);
});

router.get("/:id", (req, res) => {
  const categories = Categories.find(
    (category) => category._id === req.params.id
  );
  if (!categories)
    return res.status(404).send("The Category with the given id is not found");

  return res.send(categories);
});

module.exports = router;
