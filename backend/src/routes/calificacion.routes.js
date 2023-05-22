"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de calificaciones
const calificacionController = require("../controllers/calificacion.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/auth.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las calificaciones
router.get("/", authMiddleware.isAdmin, calificacionController.getCalificaciones);
router.get("/:id", authMiddleware.isAdmin, calificacionController.getCalificacionById);
router.post("/", authMiddleware.isAdmin, calificacionController.createCalificacion);
router.put("/", authMiddleware.isProfesor, calificacionController.updateCalificacion);
router.delete("/:id", authMiddleware.isAdmin, calificacionController.deleteCalificacion);

// Exporta el enrutador
module.exports = router;
