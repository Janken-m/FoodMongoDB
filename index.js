const foods = require("./routes/foods");
const categories = require("./routes/categories");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/foods", foods);
app.use("/api/categories", categories);

mongoose
  .connect("mongodb://localhost/intensivefoodstest")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Could not connect to mongodb", error));

app.listen(8000, () => console.log("App listen on port 8000"));
