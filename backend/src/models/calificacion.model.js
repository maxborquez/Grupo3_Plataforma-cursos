const mongoose = require("mongoose");

const calificacionSchema = new mongoose.Schema({
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso",
    required: true,
  },
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  calificacion: {
    type: Number,
    required: true,
  },
});

const Calificacion = mongoose.model("Calificacion", calificacionSchema);

module.exports = Calificacion;
