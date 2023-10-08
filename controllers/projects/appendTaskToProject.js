const { ProjectModel, TasksModel } = require("../../database/models");
const { createHttpException } = require("../../services");

const appendTaskToProject = async (req, res, next) => {
  const { taskId, projectId } = req.params;

  const task = await TasksModel.findById(taskId);
  if (!task) {
    throw createHttpException(404, "This task is not found");
  }

  const project = await ProjectModel.findById(projectId);
  if (!project) {
    throw createHttpException(404, "This project is not found");
  }

  const taskToProject = await ProjectModel.findOneAndUpdate(
    { _id: projectId, tasks: { $nin: [taskId] } },
    { $push: { tasks: taskId } },
    { new: true }
  ).populate("tasks");

  const projectToTask = await TasksModel.findOneAndUpdate(
    { _id: taskId, project: { $nin: [projectId] } },
    { $push: { project: projectId } },
    { new: true }
  ).populate("project");

  if (!taskToProject || !projectToTask) {
    return res.status(400).json({
      message: "This task has already been added to the project list",
    });
  }

  const projectWithTask = await ProjectModel.findById(projectId);

  res.json(projectWithTask);
};

module.exports = {
  appendTaskToProject,
};
