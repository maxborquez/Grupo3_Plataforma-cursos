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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado",
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
});

const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;
