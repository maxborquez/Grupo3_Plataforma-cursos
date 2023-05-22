"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rut: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  estadoCurso: {
    type: String,
    enum: ["cursando", "aprobado", "reprobado"],
    default: "cursando",
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

// Crea el modelo de datos 'User' a partir del esquema 'userSchema'
const User = mongoose.model("User", userSchema);

// Exporta el modelo de datos 'User'
module.exports = User;
