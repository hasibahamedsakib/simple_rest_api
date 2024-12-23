const express = require("express");
const cors = require("cors");

// requiring database
require("./config/db");

// creating app
const app = express();

// import userRoute
const userRoute = require("./routes/user.route");
// import todoRoute
const todoRoute = require("./routes/todo.route");

//  using middleware
app.use(cors());
app.use(express.json());

app.use("/api/users/", userRoute);
app.use("/api/todos/", todoRoute);

// home Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

// handling invalid routing error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found!",
  });
});

// handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something is wrong on server!!",
  });
});

module.exports = app;
