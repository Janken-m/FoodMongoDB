const foods = require("./routes/foods");
const categories = require("./routes/categories");
const user = require("./routes/user");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/foods", foods);
app.use("/api/categories", categories);
app.use("/api/auth", auth);
app.use("/api/users", user);

mongoose
  .connect("mongodb://localhost/intensivefoodstest")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Could not connect to mongodb", error));

app.listen(8000, () => console.log("App listen on port 8000"));
