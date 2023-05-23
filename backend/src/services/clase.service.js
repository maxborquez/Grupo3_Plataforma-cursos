"use strict";
const Clase = require("../models/clase");
const { handleError } = require("../utils/errorHandler");
const { claseBodySchema } = require("../schema/clase.schema");

async function getClases() {
  try {
    return await Clase.find();
  } catch (error) {
    handleError(error, "clase.service -> getClases");
  }
}

async function getClaseById(id) {
  try {
    return await Clase.findById(id);
  } catch (error) {
    handleError(error, "clase.service -> getClaseById");
  }
}

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

async function updateClase(id, clase) {
  try {
    const { error } = claseBodySchema.validate(clase);
    if (error) return null;

    return await Clase.findByIdAndUpdate(id, clase);
  } catch (error) {
    handleError(error, "clase.service -> updateClase");
  }
}

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
