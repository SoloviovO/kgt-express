const { addTaskStatusSchema } = require("../../schemas");
const { TasksModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const addTaskStatus = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { status } = req.body;

  const { error } = addTaskStatusSchema.validate({
    status,
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

  const result = await TasksModel.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true }
  ).catch((error) => {
    throw createHttpException(400, error.message);
  });
  if (result === null) {
    throw createHttpException(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  addTaskStatus,
};
