const { ProjectModel } = require("../../database/models");

const { addProjectSchema } = require("../../schemas");
const { createHttpException } = require("../../services");

const addProject = async (req, res) => {
  const user = req.user;

  const { title, description } = req.body;

  const { error } = addProjectSchema.validate({
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

  const newProject = await ProjectModel.create({
    title,
    description,
    owner: user._id,
  });

  res.status(201).json(newProject);
};

module.exports = {
  addProject,
};
