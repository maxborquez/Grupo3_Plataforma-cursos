// Servicio creado para manejar la autenticación de usuarios
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");

const jwt = require("jsonwebtoken");
const { configEnv } = require("../config/configEnv.js");
const { handleError } = require("../utils/errorHandler");

const { JWT_SECRET } = configEnv();

/**
 * @name signUp
 * @description Registra un nuevo usuario
 * @param user {User} - Objeto con los datos del usuario
 * @returns {Promise<*>}
 */
async function signUp(user) {
  try {
    const { nombre, apellido, email, rut, telefono, roles } = user;

    const newUser = new User({
      nombre, apellido, email, rut, telefono,
    });

    const userFound = await User.findOne({ email: user.email });
    if (userFound) return null;

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    return await newUser.save();
    // Dejare esto comentado por si les sirve para el token
    // return jwt.sign({ id: savedUser._id }, JWT_SECRET, {
    //   expiresIn: 86400, // 24 horas
    // });
  } catch (error) {
    handleError(error, "auth.service -> signUp");
  }
}

/**
 * @name signIn
 * @description Inicia sesión con un usuario
 * @param user {User} - Objeto con los datos del usuario
 * @returns {Promise<null>}
 */
async function signIn(user) {
  try {
    const userFound = await User.findOne({ email: user.email }).populate("roles");
    if (!userFound) return null;

    const roles = userFound.roles.map((role) => role.name); // Obtener los nombres de los roles del usuario

    return jwt.sign(
      {
        id: userFound._id,
        roles: roles, // Agregar el array de nombres de roles al token
      },
      JWT_SECRET,
      {
        expiresIn: 86400, // 24 horas
      }
    );
  } catch (error) {
    handleError(error, "auth.service -> signIn");
  }
}

module.exports = {
  signUp,
  signIn,
};
