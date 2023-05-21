const Asistencia = require("../models/asistencia");


exports.tomarAsistencia = async (req, res) => {
  const { cursoId, alumnoId, presente } = req.body;

  try {
    // Crear objeto de asistencia
    const nuevaAsistencia = new Asistencia({
      curso: cursoId,
      alumno: alumnoId,
      presente,
    });

    // Guardar la asistencia en la base de datos
    await nuevaAsistencia.save();

    res.status(201).json({ mensaje: "Asistencia tomada exitosamente" });
  } catch (error) {
    console.error("Error al tomar la asistencia", error);
    res.status(500).json({ mensaje: "Error al tomar la asistencia" });
  }
};

// Controlador para obtener las asistencias de un curso
exports.obtenerAsistenciasPorCurso = async (req, res) => {
  const { cursoId } = req.params;

  try {
    // Obtener las asistencias del curso
    const asistencias = await Asistencia.find({ curso: cursoId }).populate("alumno", "nombre").exec();

    res.status(200).json({ asistencias });
  } catch (error) {
    console.error("Error al obtener las asistencias", error);
    res.status(500).json({ mensaje: "Error al obtener las asistencias" });
  }
}; 
