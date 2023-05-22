const Aviso = require("../models/aviso.model");
const Curso = require("../models/curso.model");

// Obtener todos los avisos de un curso
const obtenerAvisosPorCurso = async (req, res) => {
  try {
    const { cursoId } = req.params;
    const avisos = await Aviso.find({ curso: cursoId });
    res.status(200).json(avisos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los avisos" });
  }
};

// Crear un nuevo aviso en un curso
const crearAvisoEnCurso = async (req, res) => {
  try {
    const { titulo, contenido, curso, profesor } = req.body;
    const cursoEncontrado = await Curso.findById(curso);
    if (!cursoEncontrado) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }
    const nuevoAviso = new Aviso({
      titulo,
      contenido,
      curso,
      profesor,
    });
    const avisoGuardado = await nuevoAviso.save();
    cursoEncontrado.avisos.push(avisoGuardado._id);
    await cursoEncontrado.save();
    res.status(201).json(avisoGuardado);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el aviso" });
  }
};


// Actualizar un aviso
const actualizarAviso = async (req, res) => {
  try {
    const { avisoId } = req.params;
    const { titulo, contenido } = req.body;
    const avisoActualizado = await Aviso.findByIdAndUpdate(
      avisoId,
      { titulo, contenido },
      { new: true }
    );
    if (!avisoActualizado) {
      return res.status(404).json({ error: "Aviso no encontrado" });
    }
    res.status(200).json(avisoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el aviso" });
  }
};

// Eliminar un aviso
const eliminarAviso = async (req, res) => {
  try {
    const { avisoId } = req.params;
    const avisoEliminado = await Aviso.findByIdAndRemove(avisoId);
    if (!avisoEliminado) {
      return res.status(404).json({ error: "Aviso no encontrado" });
    }
    // Eliminar la referencia al aviso en el curso correspondiente
    const curso = await Curso.findById(avisoEliminado.curso);
    curso.avisos.pull(avisoId);
    await curso.save();
    res.status(200).json(avisoEliminado);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el aviso" });
  }
};

module.exports = {
  obtenerAvisosPorCurso,
  crearAvisoEnCurso,
  actualizarAviso,
  eliminarAviso,
};