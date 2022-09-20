const dotenv = require("dotenv");

function initConfig() {
  dotenv.config();

  if (!process.env.JWT_SECRET) {
    console.info("Jwt secret is not set...");
    process.exit(1);
  }
}

module.exports = initConfig;
