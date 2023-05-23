"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");
const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef User
 * @property {string} _id
 * @property {String} name
 * @property {String} email
 */

/**
 * @name getUsers
 * @description Obtiene todos los usuarios
 * @returns {Promise<User[]|[]>}
 */
async function getUsers() {
  try {
    return await User.find();
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

/**
 * @name createUser
 * @description Crea un nuevo usuario
 * @param user {User} - Objeto con los datos del usuario
 * @returns {Promise<User|null>}
 */
async function createUser(user) {
  try {
    const { error } = userBodySchema.validate(user);
    if (error) {
      throw new Error("Error en la validación de datos");
    }

    const { nombre, apellido, email, rut, telefono, roles } = user;

    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new Error("El usuario ya existe");
    }

    const rolesFound = await Role.find({ name: { $in: roles } });
    const myRoles = rolesFound.map((role) => role._id);

    const newUser = new User({
      nombre,
      apellido,
      email,
      rut,
      telefono,
      roles: myRoles,
    });

    return await newUser.save();
  } catch (error) {
    handleError(error, "user.service -> createUser");
    throw new Error("No se pudo crear el usuario");
  }
}

/**
 * @name getUserById
 * @description Obtiene un usuario por su id
 * @param id {string} - Id del usuario
 * @returns {Promise<User|null>}
 */
async function getUserById(id) {
  try {
    return await User.findById({ _id: id });
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

/**
 * @name updateUser
 * @description Actualiza un usuario
 * @param id
 * @param user
 * @returns {Promise<User|null>}
 */
async function updateUser(id, user) {
  try {
    const { error } = userBodySchema.validate(user);
    if (error) return null;

    return await User.findByIdAndUpdate(id, user);
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}

/**
 * @name deleteUser
 * @description Elimina un usuario por su id
 * @param id {string} - Id del usuario
 * @returns {Promise<User|null>}
 */
async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
