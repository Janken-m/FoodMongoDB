const initRoutes = require("./routes");
const initDb = require("./db");
const initConfig = require("./config");

function startUp(app) {
  initConfig();
  initRoutes(app);
  initDb();
}

module.exports = startUp;
