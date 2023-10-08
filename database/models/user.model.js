const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Set password for user!"],
      trim: true,
    },
    sessionKey: {
      type: String,
      default: null,
      trim: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
