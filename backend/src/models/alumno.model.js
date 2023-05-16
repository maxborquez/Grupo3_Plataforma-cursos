const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema({
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
  cursos_inscritos_act: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    },
  ],
  cursos_inscritos_prev: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    },
  ],
});

const Alumno = mongoose.model("Alumno", alumnoSchema);

module.exports = Alumno;
