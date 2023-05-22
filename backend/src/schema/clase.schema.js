const Joi = require("joi");

const nombre = Joi.string().min(3).max(20).required();
const fecha = Joi.date().required();

const claseBodySchema = Joi.object({
  nombre,
  fecha,
});

module.exports = { claseBodySchema };
