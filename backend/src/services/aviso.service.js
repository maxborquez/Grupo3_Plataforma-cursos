"use strict";
const Aviso = require("../models/aviso");
const Curso = require("../models/curso");
const User = require("../models/user");
const { handleError } = require("../utils/errorHandler");
const { avisoBodySchema } = require("../schema/aviso.schema");

/**
 * @typedef Aviso
 * @property {string} _id
 * @property {String} titulo
 * @property {String} contenido
 * @property {Date} fecha
 * @property {String} curso
 * @property {String} profesor
 */

/**
 * @name getAvisos
 * @description Obtiene todos los avisos
 * @returns {Promise<Aviso[]|[]>}
 */
async function getAvisos() {
  try {
    return await Aviso.find();
  } catch (error) {
    handleError(error, "aviso.service -> getAvisos");
  }
}

/**
 * @name getAvisoById
 * @description Obtiene un aviso por su ID
 * @param id {string} - ID del aviso
 * @returns {Promise<Aviso|null>}
 */
async function getAvisoById(id) {
  try {
    return await Aviso.findById(id);
  } catch (error) {
    handleError(error, "aviso.service -> getAvisoById");
  }
}

/**
 * @name createAviso
 * @description Crea un nuevo aviso
 * @param aviso {Aviso} - Objeto con los datos del aviso
 * @returns {Promise<Aviso|null>}
 */
async function createAviso(aviso) {
  try {
    const { error } = avisoBodySchema.validate(aviso);
    if (error) return null;

    const { titulo, contenido, curso: cursoId, profesor: profesorId } = aviso;

    const cursoExistente = await Curso.findById(cursoId);
    if (!cursoExistente) {
      return null;
    }

    const profesorExistente = await User.findById(profesorId);
    if (!profesorExistente) {
      return null;
    }

    const nuevoAviso = new Aviso({
      titulo,
      contenido,
      curso: cursoId,
      profesor: profesorId,
    });
    return await nuevoAviso.save();
  } catch (error) {
    handleError(error, "aviso.service -> createAviso");
  }
}

/**
 * @name updateAviso
 * @description Actualiza un aviso
 * @param id {string} - ID del aviso
 * @param aviso {Aviso} - Objeto con los datos actualizados del aviso
 * @returns {Promise<Aviso|null>}
 */
async function updateAviso(id, aviso) {
  try {
    const { error } = avisoBodySchema.validate(aviso);
    if (error) return null;

    return await Aviso.findByIdAndUpdate(id, aviso);
  } catch (error) {
    handleError(error, "aviso.service -> updateAviso");
  }
}

/**
 * @name deleteAviso
 * @description Elimina un aviso por su ID
 * @param id {string} - ID del aviso
 * @returns {Promise<Aviso|null>}
 */
async function deleteAviso(id) {
  try {
    return await Aviso.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "aviso.service -> deleteAviso");
  }
}

module.exports = {
  getAvisos,
  getAvisoById,
  createAviso,
  updateAviso,
  deleteAviso,
};
