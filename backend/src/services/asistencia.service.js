"use strict";
const Asistencia = require("../models/Asistencia");
const Clase = require("../models/Clase");
const { handleError } = require("../utils/errorHandler");
const { asistenciaBodySchema } = require("../schema/asistencia.schema");

// Modifica la función marcarAsistencia para recibir las IDs desde la ruta
async function marcarAsistencia(req, res) {
  try {
    // Extraer los parámetros de la URL de la solicitud
    const { cursoId, claseId, alumnoId } = req.params;

    // Extraer el valor "presente" del cuerpo de la solicitud (si es necesario)
    const { presente } = req.body;

    // Realizar la lógica para marcar la asistencia
    const { error } = asistenciaBodySchema.validate({ presente });
    if (error) {
      return res.status(400).json({ error: 'El campo "presente" es requerido y debe ser un valor booleano.' });
    }

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

    return res.json({ state: 'Success', data: asistencia });
  } catch (error) {
    console.error('Error al marcar asistencia:', error);
    return res.status(500).json({ error: 'Error al marcar la asistencia.' });
  }
}

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
const obtenerAsistenciasAlumnoCurso = async (cursoId, alumnoId) => {
  try {
    const asistencias = await Asistencia.find({ curso: cursoId, alumno: alumnoId });
    return asistencias;
  } catch (error) {
    throw error;
  }
};

const obtenerEstadisticasAsistenciaCurso = async (cursoId) => {
  try {
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      throw new Error("El curso no existe");
    }

    const totalClases = curso.clases.length;
    const totalAlumnos = curso.alumnos.length;

    const estadisticasClases = [];

    for (const claseId of curso.clases) {
      const asistencias = await Asistencia.find({ curso: cursoId, clase: claseId, presente: true });
      const asistenciasClase = asistencias.length;
      const porcentajeAsistenciasClase = (asistenciasClase / totalAlumnos) * 100;

      estadisticasClases.push({
        claseId,
        asistenciasClase,
        totalAlumnos,
        porcentajeAsistenciasClase,
      });
    }

    return {
      totalClases,
      estadisticasClases,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  marcarAsistencia,
  corregirAsistencia,
  obtenerEstadisticasAsistencia,
  obtenerAsistenciasAlumnoCurso,
  obtenerEstadisticasAsistenciaCurso

};
