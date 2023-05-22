const Joi = require("joi");

const curso = Joi.string().required();
const alumno = Joi.string().required();
const profesor = Joi.string().required();
const calificacion = Joi.string().min(1).max(15).required();

const calificacionBodySchema = Joi.object({
  curso,
  alumno,
  profesor,
  calificacion,
});

module.exports = { calificacionBodySchema };
