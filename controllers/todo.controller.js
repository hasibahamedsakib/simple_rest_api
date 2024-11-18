// import Todo schema
const Todo = require("../models/todo.model");

// create new todo
const createTodo = async (req, res) => {
  const todoId = Math.random().toString().substring(2, 12);

  try {
    const { name, priority, status, creationDate } = req.body;
    if (!name && !priority && !status) {
      return res.status(400).json({
        message: "You Must Provide name, priority and status filed",
      });
    }
    const existingTodo = await Todo.findOne({
      name: req.body.name,
    }).sort({ creationDate: -1 });

    if (existingTodo && existingTodo?.status === "pending") {
      return res.status(400).json({
        message: "Same todo are already on your que list",
      });
    }

    const newTodo = {
      todoId,
      name,
      priority,
      status,
      creationDate,
    };

    const result = await Todo.create(newTodo);
    res.status(201).json({
      message: "Todo created successfully",
      result,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all Todos
const getAllTodos = async (req, res) => {
  try {
    const query = {};
    if (req.query.priority) {
      query.priority = req.query.priority;
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    const allTodos = await Todo.find(query);
    res.status(200).json({
      message: "All Todos fetched successfully",
      result: allTodos,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get Todo by email
const getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ todoId: req.params.todoId });
    if (todo) {
      res.status(200).json({
        message: "Todo fetched successfully",
        result: todo,
      });
    } else {
      res.status(200).json({
        message: "Todo not found for this Id",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update existing todo by id
const updateTodo = async (req, res) => {
  try {
    const { name, priority, status } = req.body;
    const todo = await Todo.findOne({ todoId: req.params.todoId });
    if (name) {
      todo.name = name;
    }
    if (priority) {
      todo.priority = priority;
    }
    if (status) {
      todo.status = status;
    }
    await todo.save();
    res.status(200).json({
      message: "Todo updated successfully",
      result: todo,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete Todo by email
const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.findOneAndDelete({
      todoId: req.params.todoId,
    });
    if (!deleteTodo) {
      return res.status(400).send({
        message: "Todo not found. Cannot delete non-existing todo.",
      });
    } else {
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
