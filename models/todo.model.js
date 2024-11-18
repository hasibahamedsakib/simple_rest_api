const mongoose = require("mongoose");

const todoScheme = mongoose.Schema({
  todoId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    require: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoScheme);
