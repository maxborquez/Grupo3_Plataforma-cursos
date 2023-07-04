const Calificacion = require("../models/calificacion.model");
const Curso = require("../models/curso.model");

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

// Función para crear una nueva calificación
async function createCalificacion(req, res) {
  try {
    const { cursoId, alumnoId, profesorId } = req.params;
    const { calificacion } = req.body;

    const participaCurso = await Curso.exists({ _id: cursoId, profesor: profesorId });
    if (!participaCurso) {
      return res.status(403).json({ message: "No tienes permiso para asignar calificaciones en este curso." });
    }

    const nuevaCalificacion = new Calificacion({
      curso: cursoId,
      alumno: alumnoId,
      profesor: profesorId,
      calificacion,
    });

    await nuevaCalificacion.save();

    res.status(201).json({ message: "La calificación fue asignada con exito" });
  } catch (error) {
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

module.exports = {
  getCalificaciones,
  getCalificacionById,
  createCalificacion,
  updateCalificacion,
  deleteCalificacion,
};
