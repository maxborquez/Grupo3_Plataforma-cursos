const Asistencia = require("../models/Asistencia");

// Marcar la asistencia de un alumno en una clase
const marcarAsistencia = async (req, res) => {
  const { alumnoId, cursoId, claseId } = req.params;
  const { presente } = req.body;

  try {
    // Verificar si la asistencia ya existe
    let asistencia = await Asistencia.findOne({
      alumno: alumnoId,
      curso: cursoId,
      clase: claseId,
    });

    if (!asistencia) {
      // Crear una nueva asistencia si no existe
      asistencia = new Asistencia({
        alumno: alumnoId,
        curso: cursoId,
        clase: claseId,
        presente,
      });
    } else {
      // Actualizar la asistencia existente
      asistencia.presente = presente;
    }

    await asistencia.save();

    res.status(200).json(asistencia);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al marcar la asistencia" });
  }
};

// Corregir la asistencia de un alumno en una clase
const corregirAsistencia = async (req, res) => {
  const { alumnoId, cursoId, claseId } = req.params;
  const { presente } = req.body;

  try {
    // Verificar si la asistencia existe
    const asistencia = await Asistencia.findOne({
      alumno: alumnoId,
      curso: cursoId,
      clase: claseId,
    });

    if (!asistencia) {
      return res.status(404).json({ error: "Asistencia no encontrada" });
    }

    // Actualizar la asistencia
    asistencia.presente = presente;
    await asistencia.save();

    res.status(200).json(asistencia);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al corregir la asistencia" });
  }
};

module.exports = {
  marcarAsistencia,
  corregirAsistencia,
};
