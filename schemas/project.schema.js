const Joi = require("joi");

const addProjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string()
    .min(2)
    .max(150)
    .regex(/^[\s\S]*.*[^\s][\s\S]*$/),
});

module.exports = { addProjectSchema };
