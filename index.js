// import app
const app = require("./app");
// import Configuration file...
const config = require("./config/config");

const PORT = config.app.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
