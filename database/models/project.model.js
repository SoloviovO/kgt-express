const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tasks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "task",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
