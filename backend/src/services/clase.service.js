"use strict";
const Clase = require("../models/clase");
const { handleError } = require("../utils/errorHandler");
const { claseBodySchema } = require("../schema/clase.schema");

/**
 * @typedef Clase
 * @property {string} _id
 * @property {String} nombre
 * @property {Date} fecha
 */

/**
 * @name getClases
 * @description Obtiene todas las clases
 * @returns {Promise<Clase[]|[]>}
 */
async function getClases() {
  try {
    return await Clase.find();
  } catch (error) {
    handleError(error, "clase.service -> getClases");
  }
}

/**
 * @name getClaseById
 * @description Obtiene una clase por su ID
 * @param id {string} - ID de la clase
 * @returns {Promise<Clase|null>}
 */
async function getClaseById(id) {
  try {
    return await Clase.findById(id);
  } catch (error) {
    handleError(error, "clase.service -> getClaseById");
  }
}

/**
 * @name createClase
 * @description Crea una nueva clase
 * @param clase {Clase} - Objeto con los datos de la clase
 * @returns {Promise<Clase|null>}
 */
async function createClase(clase) {
  try {
    const { error } = claseBodySchema.validate(clase);
    if (error) return null;

    const { nombre, fecha } = clase;

    const nuevaClase = new Clase({
      nombre,
      fecha,
    });
    return await nuevaClase.save();
  } catch (error) {
    handleError(error, "clase.service -> createClase");
  }
}

/**
 * @name updateClase
 * @description Actualiza una clase
 * @param id {string} - ID de la clase
 * @param clase {Clase} - Objeto con los datos actualizados de la clase
 * @returns {Promise<Clase|null>}
 */
async function updateClase(id, clase) {
  try {
    const { error } = claseBodySchema.validate(clase);
    if (error) return null;

    return await Clase.findByIdAndUpdate(id, clase);
  } catch (error) {
    handleError(error, "clase.service -> updateClase");
  }
}

/**
 * @name deleteClase
 * @description Elimina una clase por su ID
 * @param id {string} - ID de la clase
 * @returns {Promise<Clase|null>}
 */
async function deleteClase(id) {
  try {
    return await Clase.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "clase.service -> deleteClase");
  }
}

module.exports = {
  getClases,
  getClaseById,
  createClase,
  updateClase,
  deleteClase,
};
