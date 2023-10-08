const { addTask } = require("./addTask");
const { getTasks } = require("./getTasks");
const { updateTask } = require("./updateTask");
const { deleteTask } = require("./deleteTask");
const { addTaskStatus } = require("./addTaskStatus");

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  addTaskStatus,
};
