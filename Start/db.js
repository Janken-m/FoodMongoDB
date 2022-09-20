const mongoose = require("mongoose");

function initDb() {
  mongoose
    .connect("mongodb://localhost/intensive-food")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Could not connect to mongodb", error));
}

module.exports = initDb;
