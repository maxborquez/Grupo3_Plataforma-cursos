const mongoose = require("mongoose");

const avisoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso",
    required: true,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Aviso = mongoose.model("Aviso", avisoSchema);

module.exports = Aviso;