const startUp = require("./Start");
const express = require("express");
const app = express();

startUp(app);

app.listen(8000, () => console.log("App listen on port 8000"));
