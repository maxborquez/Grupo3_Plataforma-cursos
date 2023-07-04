"use strict";
const User = require("../models/user.model");
const { respondSuccess, respondError } = require("../utils/resHandler");
const UserService = require("../services/user.service");
const { handleError } = require("../utils/errorHandler");

/**
 * @name getUsers
 * @description Obtiene todos los usuarios
 * @param req {Request}
 * @param res {Response}
 */
async function getUsers(req, res) {
  try {
    const usuarios = await UserService.getUsers();
    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createUser
 * @description Crea un nuevo usuario
 * @param req {Request}
 * @param res {Response}
 */
async function createUser(req, res) {
  try {
    const nuevoUser = await UserService.createUser(req.body);
    nuevoUser === null
      ? respondError(
          req,
          res,
          400,
          "Error en la validacion de datos",
          "Bad Request",
          { message: "Verifique los datos ingresados" },
        )
      : respondSuccess(req, res, 201, nuevoUser);
  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "No se pudo crear el usuario");
  }
}

/**
 * @name getUserById
 * @description Obtiene un usuario por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await UserService.getUserById(id);
    user === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * @name updateUser
 * @description Actualiza un usuario por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    user === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

async function actualizarUsuario(req, res) {
  const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la solicitud
  const { nombre, apellido, email, rut, telefono, roles } = req.body; // Obtener los datos actualizados del usuario desde el cuerpo de la solicitud

  try {
    // Buscar y actualizar el usuario por su ID
    const usuarioActualizado = await User.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        email,
        rut,
        telefono,
        roles,
      },
      { new: true } // Devuelve el documento actualizado en lugar del documento original
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el usuario" });
  }
}

/**
 * @name deleteUser
 * @description Elimina un usuario por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    user === null
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Not Found",
          { message: "Verifique el id ingresado" },
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  actualizarUsuario,
};
