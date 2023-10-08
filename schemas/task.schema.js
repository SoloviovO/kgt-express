const Joi = require("joi");
const { STATUS_TYPE } = require("../enums");

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string()
    .min(2)
    .max(150)
    .regex(/^[\s\S]*.*[^\s][\s\S]*$/),
});

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string()
    .min(2)
    .max(150)
    .regex(/^[\s\S]*.*[^\s][\s\S]*$/),
});

const addTaskStatusSchema = Joi.object({
  status: Joi.string()
    .required()
    .valid(...Object.values(STATUS_TYPE)),
});

module.exports = { addTaskSchema, updateTaskSchema, addTaskStatusSchema };
