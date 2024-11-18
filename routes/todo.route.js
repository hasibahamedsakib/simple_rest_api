const express = require("express");
const router = express.Router();

// import all controllers
const {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller.js");

// get all users
router.get("/", getAllTodos);

// get single Todo
router.get("/:todoId", getSingleTodo);

// create Todo
router.post("/", createTodo);

// update Todo
router.put("/:todoId", updateTodo);

// delete Todo
router.delete("/:todoId", deleteTodo);

module.exports = router;
