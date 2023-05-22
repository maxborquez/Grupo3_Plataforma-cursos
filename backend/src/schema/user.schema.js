const Joi = require("joi");

const nombre = Joi.string().min(3).max(30).required();
const apellido = Joi.string().min(3).max(30).required();
const email = Joi.string().email().required();
const rut = Joi.string().min(12).max(12).required();
const telefono = Joi.string().min(11).max(11).required();
const roles = Joi.array()
  .min(1)
  .items(Joi.string().valid("admin", "alumno", "profesor"))
  .required();

const userBodySchema = Joi.object({
  nombre,
  apellido,
  email,
  rut,
  telefono,
  roles,
});
module.exports = { userBodySchema };
