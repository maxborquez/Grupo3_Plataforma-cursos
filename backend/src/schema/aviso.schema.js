const Joi = require("joi");


const contenido = Joi.string().min(1).max(50).required();
const fecha = Joi.date().default(Date.now);
const curso = Joi.string().required();
const profesor = Joi.string().required();

const avisoBodySchema = Joi.object({
 
  contenido,
  fecha,
  curso,
  profesor,
});

module.exports = { avisoBodySchema };
