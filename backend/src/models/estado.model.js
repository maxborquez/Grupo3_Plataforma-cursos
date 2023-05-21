const mongoose = require("mongoose");

const estadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    enum: ["Disponible", "Proximo", "Cerrado"],
    required: true,
  },
});

const Estado = mongoose.model("Estado", estadoSchema);

module.exports = Estado;
