/* eslint-disable require-jsdoc */
const Calificacion = require("../models/Calificacion");
const Curso = require("../models/Curso");

// Controlador para crear una nueva calificación asociada a un curso
const crearCalificacion = async (req, res) => {
  try {
    const { cursoId, alumno, profesor, calificacion } = req.body;
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }
    const nuevaCalificacion = new Calificacion({
      curso: curso._id,
      alumno,
      profesor,
      calificacion,
    });
    const calificacionGuardada = await nuevaCalificacion.save();
    res.status(201).json(calificacionGuardada);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la calificación" });
  }
};

// Controlador para obtener todas las calificaciones de un curso
const obtenerCalificacionesPorCurso = async (req, res) => {
  try {
    const { cursoId } = req.params;
    const calificaciones = await Calificacion.find({ curso: cursoId })
      .populate("alumno", "nombre apellido")
      .populate("profesor", "nombre apellido");
    res.status(200).json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las calificaciones" });
  }
};


// Controlador para actualizar una calificación existente
const actualizarCalificacion = async (req, res) => {
    try {
      const { calificacionId } = req.params;
      const { calificacion } = req.body;
      const calificacionActualizada = await Calificacion.findByIdAndUpdate(
        calificacionId,
        { calificacion },
        { new: true },
      );
      res.status(200).json(calificacionActualizada);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la calificación" });
    }
  };
  
  // Controlador para eliminar una calificación existente
  const eliminarCalificacion = async (req, res) => {
    try {
      const { calificacionId } = req.params;
      await Calificacion.findByIdAndRemove(calificacionId);
      res.status(200).json({ message: "Calificación eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la calificación" });
    }
  };
  
  module.exports = {
    crearCalificacion,
    obtenerCalificacionesPorCurso,
    actualizarCalificacion,
    eliminarCalificacion,
  };
