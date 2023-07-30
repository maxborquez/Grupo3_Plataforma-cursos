const Joi = require("joi");

const curso = Joi.string().required();
const alumno = Joi.string().required();
const profesor = Joi.string().required();
const calificacion = Joi.string().valid("Bien", "Mal", "Medio").required();

const calificacionBodySchema = Joi.object({
  curso,
  alumno,
  profesor,
  calificacion,
});

module.exports = { calificacionBodySchema };
