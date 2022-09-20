require("express-async-errors");
const cors = require("cors");
const express = require("express");
const error = require("../middleware/error");
const foods = require("../routes/foods");
const categories = require("../routes/categories");
const user = require("../routes/user");
const auth = require("../routes/auth");

function initRoutes(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/foods", foods);
  app.use("/api/categories", categories);
  app.use("/api/auth", auth);
  app.use("/api/users", user);
  app.use(error);
}

module.exports = initRoutes;
