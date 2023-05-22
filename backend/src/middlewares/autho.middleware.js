// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function isAdmin(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(req, res, 401, "Require Admin Role!");
  } catch (error) {
    handleError(error, "autho.middleware -> isAdmin");
  }
}

async function isAlumno(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "alumno") {
        next();
        return;
      }
    }
    return respondError(req, res, 401, "Require Alumno Role!");
  } catch (error) {
    handleError(error, "autho.middleware -> isAlumno");
  }
}

async function isProfesor(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "profesor") {
        next();
        return;
      }
    }
    return respondError(req, res, 401, "Require Profesor Role!");
  } catch (error) {
    handleError(error, "autho.middleware -> isProfesor");
  }
}

module.exports = {
  isAdmin,
  isAlumno,
  isProfesor,
};
