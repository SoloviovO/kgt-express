const { TasksModel, ProjectModel } = require("../../database/models");

const { createHttpException } = require("../../services");

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const taskToDelete = await TasksModel.findOne({ user: _id, _id: id });
  if (!taskToDelete) {
    throw createHttpException(400, "This task is not yours");
  }

  const projectsWithTask = await ProjectModel.find({ tasks: id });

  for (const project of projectsWithTask) {
    await ProjectModel.findByIdAndUpdate(
      project._id,
      { $pull: { tasks: id } },
      { new: true }
    );
  }

  const result = await TasksModel.findByIdAndDelete(id).catch((error) => {
    throw createHttpException(400, error.message);
  });

  if (!result) {
    throw createHttpException(404, "There is no such id");
  }

  res.json({
    message: "Delete success!!!",
  });
};

module.exports = {
  deleteTask,
};
