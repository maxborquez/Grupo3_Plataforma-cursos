const mongoose = require("mongoose");

const profesorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  cursos_dictando: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    },
  ],
  cursos_dictados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    },
  ],
});

const Profesor = mongoose.model("Profesor", profesorSchema);

module.exports = Profesor;

