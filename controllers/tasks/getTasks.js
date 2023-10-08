const { TasksModel } = require("../../database/models");

const getTasks = async (req, res, next) => {
  const { _id } = req.user;
  const { page, limit, status, projectId, sortBy } = req.query;

  const filter = { user: _id };
  if (status) {
    filter.status = status;
  }
  if (projectId) {
    filter.project = projectId;
  }

  const tasksAll = await TasksModel.find({ owner: _id, ...filter });

  let sortField = "createdAt";
  let sortOrder = 1;
  if (sortBy) {
    const parts = sortBy.split(":");
    if (parts.length === 2) {
      sortField = parts[0];
      sortOrder = parts[1].toLowerCase() === "desc" ? -1 : 1;
    }
  }

  const sort = {};
  sort[sortField] = sortOrder;

  const tasks = await TasksModel.find({ owner: _id, ...filter }, null, {
    skip: (page - 1) * limit,
    limit: limit,
  }).sort(sort);

  res.json({ tasks, total: tasksAll.length });
};

module.exports = {
  getTasks,
};
