const mongoose = require("mongoose");
const { STATUS_TYPE } = require("../../enums");

const tasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minLength: 2,
      maxLength: 150,
    },
    status: {
      type: String,
      enum: Object.values(STATUS_TYPE),
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    project: { type: [mongoose.Schema.Types.ObjectId], ref: "project" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TasksModel = mongoose.model("task", tasksSchema);

module.exports = { TasksModel };
