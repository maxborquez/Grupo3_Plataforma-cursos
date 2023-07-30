"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de asistencia
const asistenciaController = require("../controllers/asistencia.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para la asistencia
router.post("/curso/:cursoId/clase/:claseId/alumno/:alumnoId", asistenciaController.marcarAsistencia);
router.put("/curso/:cursoId/clase/:claseId/alumno/:alumnoId", authMiddleware.isProfesor, asistenciaController.corregirAsistencia);
router.get("/:cursoId/alumno/:alumnoId/estadisticas", asistenciaController.obtenerEstadisticasAsistencia);
router.get("/:cursoId/alumno/:alumnoId", asistenciaController.obtenerAsistenciasAlumnoCurso);
router.get("/:cursoId/estadisticas", authMiddleware.isAdmin, asistenciaController.obtenerEstadisticasAsistenciaCurso);
router.get('/curso/:cursoId/clase/:claseId', asistenciaController.getAsistenciasByCursoYClase);

// Exporta el enrutador
module.exports = router;
