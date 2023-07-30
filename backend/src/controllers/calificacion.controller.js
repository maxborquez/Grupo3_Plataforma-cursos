const Calificacion = require("../models/calificacion.model");
const Curso = require("../models/curso.model");
const calificacionService = require("../services/calificacion.service");

// Obtener todas las calificaciones
const getCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.find();
    res.status(200).json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener las calificaciones" });
  }
};

// Obtener una calificación por su ID
const getCalificacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const calificacion = await Calificacion.findById(id);
    if (!calificacion) {
      return res.status(404).json({ error: "No se encontró la calificación" });
    }
    res.status(200).json(calificacion);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener la calificación" });
  }
};


const getCalificacionesByCursoId = async (cursoId) => {
  try {
    const curso = await Curso.findById(cursoId).populate("calificaciones");
    if (!curso) {
      return null; // El curso no se encontró
    }
    return curso.calificaciones;
  } catch (error) {
    console.error("Error al obtener las calificaciones:", error);
    throw error;
  }
};

// Función para crear una nueva calificación
async function createCalificacion(req, res) {
  try {
    const { cursoId, alumnoId, profesorId } = req.params;
    const { calificacion } = req.body;

    console.log("cursoId:", cursoId);
    console.log("alumnoId:", alumnoId);
    console.log("profesorId:", profesorId);
    console.log("calificacion:", calificacion);

    const calificacionGuardada = await calificacionService.createCalificacion(cursoId, alumnoId, profesorId, calificacion);

    if (!calificacionGuardada) {
      return res.status(500).json({ message: "Error al asignar la calificación." });
    }

    // Agregar el ID de la calificación al arreglo de calificaciones del curso
    await Curso.findByIdAndUpdate(cursoId, { $push: { calificaciones: calificacionGuardada._id } });

    res.status(201).json({ message: "La calificación fue asignada con éxito" });
  } catch (error) {
    console.error("Error en el controlador createCalificacion:", error);
    res.status(500).json({ message: "Error al asignar la calificación.", error });
  }
}


// Función para cambiar una calificación específica de un alumno
async function updateCalificacion(req, res) {
  try {
    const { calificacionId } = req.params;
    const { nuevaCalificacion } = req.body;

    // Actualizar la calificación
    const calificacionActualizada = await Calificacion.findByIdAndUpdate(calificacionId, { calificacion: nuevaCalificacion });

    if (!calificacionActualizada) {
      return res.status(404).json({ message: "La calificación no existe." });
    }

    res.status(200).json({ message: "Calificación actualizada con éxito"});
  } catch (error) {
    res.status(500).json({ message: "Error al modificar la calificación.", error });
  }
}

// Eliminar una calificación
const deleteCalificacion = async (req, res) => {
  const { id } = req.params;
  try {
    const calificacionEliminada = await Calificacion.findByIdAndDelete(id);
    if (!calificacionEliminada) {
      return res.status(404).json({ error: "No se encontró la calificación" });
    }
    res.status(200).json({ message: "Calificación eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al eliminar la calificación" });
  }
};

const obtenerCalificacionesPorCurso = async (req, res) => {
  const { cursoId } = req.params;
  try {
    const calificaciones = await Calificacion.find({ curso: cursoId })
      .populate('alumno', 'nombre apellido');
    res.status(200).json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las calificaciones del curso" });
  }
};


module.exports = {
  getCalificaciones,
  getCalificacionById,
  createCalificacion,
  updateCalificacion,
  deleteCalificacion,
  obtenerCalificacionesPorCurso,
  getCalificacionesByCursoId
};
