const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks");
const projectsRouter = require("./routes/project");

const { errorHandlingMiddleware } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/projects", projectsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandlingMiddleware);

module.exports = app;
