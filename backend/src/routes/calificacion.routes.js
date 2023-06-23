"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de calificaciones
const calificacionController = require("../controllers/calificacion.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las calificaciones
router.get("/", calificacionController.getCalificaciones);
router.get("/:id", calificacionController.getCalificacionById);
router.post("/curso/:cursoId/alumno/:alumnoId/profesor/:profesorId", authMiddleware.isAdminOrProfesor, calificacionController.createCalificacion);
router.put("/:calificacionId", authMiddleware.isAdminOrProfesor, calificacionController.updateCalificacion);
router.delete("/:id", authMiddleware.isAdminOrProfesor, calificacionController.deleteCalificacion);

// Exporta el enrutador
module.exports = router;
