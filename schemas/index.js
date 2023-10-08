const { addUserSchema, refreshSchema } = require("./user-auth.schema");
const {
  addTaskSchema,
  updateTaskSchema,
  addTaskStatusSchema,
} = require("./task.schema");
const { addProjectSchema } = require("./project.schema");

module.exports = {
  addUserSchema,
  addTaskSchema,
  updateTaskSchema,
  addTaskStatusSchema,
  refreshSchema,
  addProjectSchema,
};
