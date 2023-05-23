"use strict";
const Curso = require("../models/curso");
const { handleError } = require("../utils/errorHandler");
const { cursoBodySchema } = require("../schema/curso.schema");


async function getCursos() {
  try {
    return await Curso.find();
  } catch (error) {
    handleError(error, "curso.service -> getCursos");
  }
}

async function getCursoById(id) {
  try {
    return await Curso.findById(id);
  } catch (error) {
    handleError(error, "curso.service -> getCursoById");
  }
}

async function createCurso(curso) {
  try {
    const { error } = cursoBodySchema.validate(curso);
    if (error) return null;

    const {
      nombre,
      descripcion,
      estado,
      fecha_inicio,
      fecha_fin,
      profesor,
      alumnos,
      clases,
      avisos,
      calificaciones,
    } = curso;

    const nuevoCurso = new Curso({
      nombre,
      descripcion,
      estado,
      fecha_inicio,
      fecha_fin,
      profesor,
      alumnos,
      clases,
      avisos,
      calificaciones,
    });
    return await nuevoCurso.save();
  } catch (error) {
    handleError(error, "curso.service -> createCurso");
  }
}


async function updateCurso(id, curso) {
  try {
    const { error } = cursoBodySchema.validate(curso);
    if (error) return null;

    return await Curso.findByIdAndUpdate(id, curso);
  } catch (error) {
    handleError(error, "curso.service -> updateCurso");
  }
}


async function deleteCurso(id) {
  try {
    return await Curso.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "curso.service -> deleteCurso");
  }
}

module.exports = {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
};
