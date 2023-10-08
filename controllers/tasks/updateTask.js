const { TasksModel } = require("../../database/models");
const { updateTaskSchema } = require("../../schemas");
const { createHttpException } = require("../../services");

const updateTask = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title && !description) {
    throw createHttpException(400, "Request body is empty!");
  }

  const { error } = updateTaskSchema.validate({
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

  const taskUpdate = await TasksModel.findOne({ owner: _id, _id: id });
  if (!taskUpdate) {
    throw createHttpException(400, "This task is not yours");
  }
  const newTask = await TasksModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    { new: true }
  )
    .exec()
    .catch((error) => {
      throw createHttpException(400, error.message);
    });

  if (newTask === null) {
    throw createHttpException(404, "Not found");
  }

  res.json(newTask);
};

module.exports = {
  updateTask,
};
