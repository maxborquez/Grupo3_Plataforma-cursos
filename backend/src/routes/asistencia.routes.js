"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de asistencia
const asistenciaController = require("../controllers/asistencia.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/auth.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para la asistencia
router.put("/:cursoId/clase/:claseId/alumno/:alumnoId", authMiddleware.isAdmin, asistenciaController.marcarAsistencia);
router.put("/:cursoId/clase/:claseId/alumno/:alumnoId/corregir", authMiddleware.isAdmin, asistenciaController.corregirAsistencia);
router.get("/:cursoId/alumno/:alumnoId/estadisticas", asistenciaController.obtenerEstadisticasAsistencia);

// Exporta el enrutador
module.exports = router;
