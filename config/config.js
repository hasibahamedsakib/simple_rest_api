// config env file
require("dotenv").config();

const dev = {
  app: {
    PORT: process.env.PORT || 2000,
  },
  db: {
    URL: process.env.DB_URL,
  },
};

module.exports = dev;
