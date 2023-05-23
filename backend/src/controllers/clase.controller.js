const Clase = require("../models/clase.model");
const Curso = require("../models/curso.model");

// Obtener todas las clases
const obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.find();
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener las clases" });
  }
};

// Obtener una clase por su ID
const obtenerClasePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const clase = await Clase.findById(id);
    
    if (!clase) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }

    res.status(200).json(clase);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener la clase" });
  }
};

// Crear una nueva clase
const crearClase = async (req, res) => {
  const { nombre, fecha } = req.body;

  try {
    const nuevaClase = await Clase.create({ nombre, fecha });

    // Obtener el ID del curso al que se debe agregar la clase
    const { cursoId } = req.params;

    // Encontrar el curso y actualizar el array de clases
    const curso = await Curso.findById(cursoId);
    curso.clases.push(nuevaClase._id);
    await curso.save();

    res.status(201).json(nuevaClase);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al crear la clase" });
  }
};

// Actualizar una clase existente
const actualizarClase = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha } = req.body;

  try {
    const claseActualizada = await Clase.findByIdAndUpdate(
      id,
      { nombre, fecha },
      { new: true }
    );

    if (!claseActualizada) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }

    res.status(200).json(claseActualizada);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al actualizar la clase" });
  }
};

// Eliminar una clase existente
const eliminarClase = async (req, res) => {
  const { id } = req.params;

  try {
    const claseEliminada = await Clase.findByIdAndRemove(id);

    if (!claseEliminada) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }

    // Obtener el ID del curso al que pertenece la clase eliminada
    const { cursoId } = req.params;

    // Encontrar el curso y eliminar la clase del array de clases
    const curso = await Curso.findById(cursoId);
    curso.clases = curso.clases.filter((clase) => clase.toString() !== id);
    await curso.save();

    res.status(200).json({ mensaje: "Clase eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al eliminar la clase" });
  }
};

module.exports = {
  obtenerClases,
  obtenerClasePorId,
  crearClase,
  actualizarClase,
  eliminarClase,
};
