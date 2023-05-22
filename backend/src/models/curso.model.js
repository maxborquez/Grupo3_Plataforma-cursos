const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ["Disponible", "Proximo", "Cerrado"],
    required: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },
  fecha_fin: {
    type: Date,
    required: true,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  alumnos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  clases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clase",
    },
  ],
  avisos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aviso",
    },
  ],
});

const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;
