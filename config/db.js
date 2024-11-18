const mongoose = require("mongoose");
const config = require("./config");

const DB_URL = config.db.URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Database Connected successful`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
