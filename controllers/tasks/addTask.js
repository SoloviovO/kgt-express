const { TasksModel } = require("../../database/models");

const { addTaskSchema } = require("../../schemas");
const { createHttpException } = require("../../services");

const addTask = async (req, res) => {
  const user = req.user;

  const { title, description } = req.body;

  const { error } = addTaskSchema.validate({
    title,
    description,
  });

  if (error) {
    const invalidField = error.details[0].path[0];
    throw createHttpException(
      400,
      `Missing or not valid field ${invalidField} => ${error.message}`
    );
  }

  const newTask = await TasksModel.create({
    title,
    description,
    owner: user._id,
  });

  res.status(201).json(newTask);
};

module.exports = {
  addTask,
};
