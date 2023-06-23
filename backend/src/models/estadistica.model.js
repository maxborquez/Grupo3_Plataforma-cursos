const mongoose = require("mongoose");

const estadisticaSchema = new mongoose.Schema({
  fecha_creacion: {
    type: Date,
    required: true,
    default: Date.now,
  },
  usuarios_por_rol: [{
    rol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    cantidad: {
      type: Number,
      required: true,
      default: 0,
    },
  }],
  total_cursos: {
    type: Number,
    required: true,
    default: 0,
  },
  alumnos_por_curso: [{
    curso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    },
    cantidad: {
      type: Number,
      required: true,
      default: 0,
    },
  }],
  cursos_por_estado: [{
    estado: {
      type: String,
      required: true,
    },
    cursos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    }],
  }],
  porcentaje_aprobacion: [{
    curso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
    },
    porcentaje: {
      type: Number,
      required: true,
    },
  }],
});

const Estadistica = mongoose.model("Estadistica", estadisticaSchema);

module.exports = Estadistica;