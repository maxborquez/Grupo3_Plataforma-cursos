"use strict";
const Calificacion = require("../models/calificacion.model");
const Curso = require("../models/curso.model");
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


async function createCalificacion(cursoId, alumnoId, profesorId, calificacion, nombre) {
  try {
    const participaCurso = await Curso.exists({ _id: cursoId, profesor: profesorId });
    if (!participaCurso) {
      return null;
    }

    const nuevaCalificacion = new Calificacion({
      curso: cursoId,
      alumno: alumnoId,
      profesor: profesorId,
      calificacion,
      nombre,
    });

    return await nuevaCalificacion.save();
  } catch (error) {
    throw error; // Agregar esta línea para arrojar el error
  }
}

async function updateCalificacion(id, nombreCalificacion, nuevaCalificacion) {
  try {
    const { error } = calificacionBodySchema.validate({ calificacion: nuevaCalificacion });
    if (error) return null;

    const calificacionExistente = await Calificacion.findOne({ _id: id });
    if (!calificacionExistente) {
      return null;
    }

    calificacionExistente.nombreCalificacion = nombreCalificacion;
    calificacionExistente.calificacion = nuevaCalificacion;
    return await calificacionExistente.save();
  } catch (error) {
    console.error("Error al actualizar la calificación:", error);
    // Aquí puedes realizar cualquier otra acción que desees cuando ocurra un error en la actualización.
  }
}



async function deleteCalificacion(id) {
  try {
    return await Calificacion.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "calificacion.service -> deleteCalificacion");
  }
}


async function obtenerCalificacionesPorCurso(cursoId) {
  try {
    return await Calificacion.find({ curso: cursoId }).populate("alumno");
  } catch (error) {
    handleError(error, "calificacion.service -> obtenerCalificacionesPorCurso");
  }
}

module.exports = {
  getCalificaciones,
  getCalificacionById,
  createCalificacion,
  updateCalificacion,
  deleteCalificacion,
  obtenerCalificacionesPorCurso
};
