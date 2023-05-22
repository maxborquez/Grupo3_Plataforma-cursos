const Joi = require("joi");

const curso = Joi.string().required();
const alumno = Joi.string().required();
const clase = Joi.string().required();
const presente = Joi.boolean().default(false);

const asistenciaBodySchema = Joi.object({
  curso,
  alumno,
  clase,
  presente,
});

module.exports = { asistenciaBodySchema };
