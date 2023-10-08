const express = require("express");

const tasksController = require("../../controllers/tasks");

const { userAuthMiddleware } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.post(
  "/",
  userAuthMiddleware,
  controllerWrapper(tasksController.addTask)
);

router.get(
  "/",
  userAuthMiddleware,
  controllerWrapper(tasksController.getTasks)
);

router.patch(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(tasksController.updateTask)
);

router.patch(
  "/:id/status",
  userAuthMiddleware,
  controllerWrapper(tasksController.addTaskStatus)
);

router.delete(
  "/:id",
  userAuthMiddleware,
  controllerWrapper(tasksController.deleteTask)
);

module.exports = router;
