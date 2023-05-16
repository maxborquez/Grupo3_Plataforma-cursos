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
    enum: ["disponible", "proximo", "terminado"],
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
  profesor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profesor",
    required: true,
  },
  estadisticas: {
    cantidad_inscritos: {
      type: Number,
      required: true,
    },
    promedio_calificaciones: {
      type: Number,
      required: true,
    },
    asistencia_promedio: {
      type: Number,
      required: true,
    },
  },
});

const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;
