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
      alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      estado: {
        type: String,
        enum: ["Cursando", "Aprobado", "Reprobado"],
        default: "Cursando",
      },
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
  calificaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calificacion",
    },
  ],
});

const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;
