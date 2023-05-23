"use strict";
const Calificacion = require("../models/calificacion");
const Curso = require("../models/curso");
const { handleError } = require("../utils/errorHandler");
const { calificacionBodySchema } = require("../schema/calificacion.schema");


async function getCalificaciones() {
  try {
    return await Calificacion.find();
  } catch (error) {
    handleError(error, "calificacion.service -> getCalificaciones");
  }
}

/**
 * @name getCalificacionById
 * @description Obtiene una calificación por su ID
 * @param id {string} - ID de la calificación
 * @returns {Promise<Calificacion|null>}
 */
async function getCalificacionById(id) {
  try {
    return await Calificacion.findById(id);
  } catch (error) {
    handleError(error, "calificacion.service -> getCalificacionById");
  }
}


async function createCalificacion(calificacion) {
  try {
    const { error } = calificacionBodySchema.validate(calificacion);
    if (error) return null;

    const { curso, alumno, profesor, calificacion: calificacionValue } = calificacion;

    const participaCurso = await Curso.exists({ _id: curso, profesor });
    if (!participaCurso) {
      return null;
    }

    const nuevaCalificacion = new Calificacion({ curso, alumno, profesor, calificacion: calificacionValue });
    return await nuevaCalificacion.save();
  } catch (error) {
    handleError(error, "calificacion.service -> createCalificacion");
  }
}


async function updateCalificacion(id, nuevaCalificacion) {
  try {
    const { error } = calificacionBodySchema.validate({ calificacion: nuevaCalificacion });
    if (error) return null;

    const calificacionExistente = await Calificacion.findOne({ _id: id });
    if (!calificacionExistente) {
      return null;
    }

    calificacionExistente.calificacion = nuevaCalificacion;
    return await calificacionExistente.save();
  } catch (error) {
    handleError(error, "calificacion.service -> updateCalificacion");
  }
}

async function deleteCalificacion(id) {
  try {
    return await Calificacion.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "calificacion.service -> deleteCalificacion");
  }
}

module.exports = {
  getCalificaciones,
  getCalificacionById,
  createCalificacion,
  updateCalificacion,
  deleteCalificacion,
};
