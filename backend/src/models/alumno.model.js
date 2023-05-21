const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnoSchema = new Schema({
  nombre: { type: String,
     required: true },

  apellido: { type: String, 
    required: true },

  correoInstitucional: { type: String, 
    required: true },

  cursosInscritos: [{ type: Schema.Types.ObjectId, 
    ref: 'Curso' }]

});

module.exports = mongoose.model('Alumno', alumnoSchema);