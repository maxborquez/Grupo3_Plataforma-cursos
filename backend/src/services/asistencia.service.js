"use strict";
const Asistencia = require("../models/Asistencia");
const Clase = require("../models/Clase");
const { handleError } = require("../utils/errorHandler");
const { asistenciaBodySchema } = require("../schema/asistencia.schema");

/**
 * @name marcarAsistencia
 * @description Marca la asistencia de un alumno en una clase
 * @param alumnoId {string} - ID del alumno
 * @param cursoId {string} - ID del curso
 * @param claseId {string} - ID de la clase
 * @param presente {boolean} - Indica si el alumno está presente o no
 * @returns {Promise<Asistencia|null>}
 */
async function marcarAsistencia(alumnoId, cursoId, claseId, presente) {
  try {
    const { error } = asistenciaBodySchema.validate({ presente });
    if (error) return null;

    let asistencia = await Asistencia.findOne({
      alumno: alumnoId,
      curso: cursoId,
      clase: claseId,
    });

    if (!asistencia) {
      asistencia = new Asistencia({
        alumno: alumnoId,
        curso: cursoId,
        clase: claseId,
        presente,
      });
    } else {
      asistencia.presente = presente;
    }

    await asistencia.save();

    return asistencia;
  } catch (error) {
    handleError(error, "asistencia.service -> marcarAsistencia");
  }
}

/**
 * @name corregirAsistencia
 * @description Corrige la asistencia de un alumno en una clase
 * @param alumnoId {string} - ID del alumno
 * @param cursoId {string} - ID del curso
 * @param claseId {string} - ID de la clase
 * @param presente {boolean} - Indica si el alumno está presente o no
 * @returns {Promise<Asistencia|null>}
 */
async function corregirAsistencia(alumnoId, cursoId, claseId, presente) {
  try {
    const { error } = asistenciaBodySchema.validate({ presente });
    if (error) return null;

    const asistencia = await Asistencia.findOne({
      alumno: alumnoId,
      curso: cursoId,
      clase: claseId,
    });

    if (!asistencia) {
      return null;
    }

    asistencia.presente = presente;
    await asistencia.save();

    return asistencia;
  } catch (error) {
    handleError(error, "asistencia.service -> corregirAsistencia");
  }
}

/**
 * @name obtenerEstadisticasAsistencia
 * @description Obtiene las estadísticas de asistencia de un alumno en un curso
 * @param cursoId {string} - ID del curso
 * @param alumnoId {string} - ID del alumno
 * @returns {Promise<Object|null>}
 */
async function obtenerEstadisticasAsistencia(cursoId, alumnoId) {
  try {
    const clases = await Clase.find({ curso: cursoId });
    const totalClases = clases.length;

    const asistencias = await Asistencia.find({ curso: cursoId, alumno: alumnoId });
    const clasesAsistidas = asistencias.length;

    const porcentajeAsistencia = (clasesAsistidas / totalClases) * 100;

    return {
      totalClases,
      clasesAsistidas,
      porcentajeAsistencia,
    };
  } catch (error) {
    handleError(error, "asistencia.service -> obtenerEstadisticasAsistencia");
  }
}

module.exports = {
  marcarAsistencia,
  corregirAsistencia,
  obtenerEstadisticasAsistencia,
};
