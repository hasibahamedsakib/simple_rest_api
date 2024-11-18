const mongoose = require("mongoose");

const todoScheme = mongoose.Schema({
  todoId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: Boolean,
    require: true,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoScheme);
