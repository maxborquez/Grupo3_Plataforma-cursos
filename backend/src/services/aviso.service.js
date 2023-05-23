"use strict";
const Aviso = require("../models/aviso");
const Curso = require("../models/curso");
const User = require("../models/user");
const { handleError } = require("../utils/errorHandler");
const { avisoBodySchema } = require("../schema/aviso.schema");


async function getAvisos() {
  try {
    return await Aviso.find();
  } catch (error) {
    handleError(error, "aviso.service -> getAvisos");
  }
}

async function getAvisoById(id) {
  try {
    return await Aviso.findById(id);
  } catch (error) {
    handleError(error, "aviso.service -> getAvisoById");
  }
}

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


async function updateAviso(id, aviso) {
  try {
    const { error } = avisoBodySchema.validate(aviso);
    if (error) return null;

    return await Aviso.findByIdAndUpdate(id, aviso);
  } catch (error) {
    handleError(error, "aviso.service -> updateAviso");
  }
}

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
