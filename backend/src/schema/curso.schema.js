const Joi = require("joi");

const nombre = Joi.string().min(3).max(15).required();
const descripcion = Joi.string().min(3).max(20).required();
const estado = Joi.string().valid("Disponible", "Proximo", "Cerrado").required();
const fecha_inicio = Joi.date().required();
const fecha_fin = Joi.date().required();
const profesor = Joi.string().required();
const alumnos = Joi.array().items(Joi.string());
const clases = Joi.array().items(Joi.string());
const avisos = Joi.array().items(Joi.string());
const calificaciones = Joi.array().items(Joi.string());

const cursoBodySchema = Joi.object({
  nombre,
  descripcion,
  estado,
  fecha_inicio,
  fecha_fin,
  profesor,
  alumnos,
  clases,
  avisos,
  calificaciones,
});

module.exports = { cursoBodySchema };
