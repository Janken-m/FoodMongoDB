const foods = require("./routes/foods");
const categories = require("./routes/categories");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/foods", foods);
app.use("/api/categories", categories);

app.listen(8000, () => console.log("app listen on port 8000"));
