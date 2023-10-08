const express = require("express");

const projectController = require("../../controllers/projects");

const { userAuthMiddleware } = require("../../middlewares");
const { controllerWrapper } = require("../../services");

const router = express.Router();

router.post(
  "/",
  userAuthMiddleware,
  controllerWrapper(projectController.addProject)
);

router.post(
  "/addtask/:taskId/:projectId",
  userAuthMiddleware,
  controllerWrapper(projectController.appendTaskToProject)
);

module.exports = router;
