const Joi = require("joi");

const titulo = Joi.string().min(1).max(20).required();
const contenido = Joi.string().min(1).max(50).required();
const fecha = Joi.date().default(Date.now);
const curso = Joi.string().required();
const profesor = Joi.string().required();

const avisoBodySchema = Joi.object({
  titulo,
  contenido,
  fecha,
  curso,
  profesor,
});

module.exports = { avisoBodySchema };
