"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");
const { userBodySchema } = require("../schema/user.schema");

async function getUsers() {
  try {
    return await User.find()
    .populate('roles', 'name')
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

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


async function getUserById(id) {
  try {
    return await User.findById({ _id: id });
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

async function updateUser(id, user) {
  try {
    const { error } = userBodySchema.validate(user);
    if (error) return null;

    return await User.findByIdAndUpdate(id, user);
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

async function getProfesores() {
  try {
    const profesores = await User.find()
      .populate({
        path: "roles",
        match: { name: "profesor" }, // Filtrar solo los roles con el nombre "profesor"
        select: "name", // Seleccionar solo el campo "name" del modelo Role
      })
      .exec();

    // Filtrar los usuarios que tienen el rol "profesor" en la propiedad "roles"
    const profesoresFiltrados = profesores.filter(
      (usuario) => usuario.roles.length > 0
    );

    return profesoresFiltrados;
  } catch (error) {
    handleError(error, "user.service -> getProfesores");
  }
}


module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getProfesores,
};
