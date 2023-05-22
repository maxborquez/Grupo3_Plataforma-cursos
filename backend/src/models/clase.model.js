const mongoose = require("mongoose");

const claseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});

const Clase = mongoose.model("Clase", claseSchema);

module.exports = Clase;