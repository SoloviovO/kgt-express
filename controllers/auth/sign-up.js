const { UserModel } = require("../../database/models");
const { createHash, createHttpException } = require("../../services");
const { addUserSchema } = require("../../schemas");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = addUserSchema.validate({ email, password });

  if (error) {
    const invalidField = error.details[0].path[0];
    throw createHttpException(
      400,
      `Missing or not valid field ${invalidField} => ${error.message}`
    );
  }

  const user = await UserModel.findOne({ email });
  if (user) {
    throw createHttpException(409, "Email in use");
  }

  const passwordHash = await createHash(password);

  const newUser = await UserModel.create({
    email,
    passwordHash,
  });

  res.status(201).json({
    id: newUser._id,
    email: newUser.email,
  });
};

module.exports = {
  signUp,
};
