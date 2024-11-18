// import Todo schema
const Todo = require("../models/todo.model");

// create new todo
const createTodo = async (req, res) => {
  const todoId = Math.random().toString().substring(2, 12);

  try {
    const { title, description, priority, isCompleted } = req.body;
    if (!title && !description && !priority && !isCompleted) {
      return res.status(400).json({
        message:
          "You Must Provide title, description, priority and isCompleted filed",
      });
    }
    const existingTodo = await Todo.findOne({ title: req.body.title });

    if (existingTodo) {
      return res.status(400).send({
        message: "todo are already created",
      });
    }

    const newTodo = {
      todoId,
      title,
      description,
      priority,
      isCompleted,
    };

    const result = await Todo.create(newTodo);
    res.status(201).json(result);
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
    const allTodos = await Todo.find(query);
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get Todo by email
const getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ todoId: req.params.todoId });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(200).json({ message: "Todo not found for this Id" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update existing todo by id
const updateTodo = async (req, res) => {
  try {
    const { title, description, priority, isCompleted } = req.body;
    const todo = await Todo.findOne({ todoId: req.params.todoId });
    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }
    if (priority) {
      todo.priority = priority;
    }
    if (isCompleted) {
      todo.isCompleted = isCompleted;
    }
    await todo.save();
    res.status(200).json(todo);
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
      return res
        .status(400)
        .send({ message: "todo not found.Cannot delete non-existing todo." });
    } else {
      res.status(200).json({ message: "todo deleted successful" });
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
