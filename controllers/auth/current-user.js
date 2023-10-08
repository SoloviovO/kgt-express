const { TasksModel, ProjectModel } = require("../../database/models");

const getCurrentUser = async (req, res, next) => {
  const user = req.user;

  const userTasks = await TasksModel.find({ owner: user._id });
  const userProjects = await ProjectModel.find({ owner: user._id });

  res.json({
    id: user._id,
    email: user.email,
    projects: userProjects,
    tasks: userTasks,
  });
};

module.exports = {
  getCurrentUser,
};
