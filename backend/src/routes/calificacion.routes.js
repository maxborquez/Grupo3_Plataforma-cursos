"use strict";
const express = require("express");
const calificacionController = require("../controllers/calificacion.controller.js");
const authMiddleware = require("../middlewares/autho.middleware.js");

const router = express.Router();

// Ruta para obtener las calificaciones por curso
router.get("/curso/:cursoId", calificacionController.obtenerCalificacionesPorCurso);

router.get("/", calificacionController.getCalificaciones);
router.get("/:id", calificacionController.getCalificacionById);
router.get("/curso/:cursoId", calificacionController.obtenerCalificacionesPorCurso);
router.post("/:cursoId/alumno/:alumnoId/profesor/:profesorId", authMiddleware.isAdminOrProfesor, calificacionController.createCalificacion);
router.put("/:calificacionId", authMiddleware.isAdminOrProfesor, calificacionController.updateCalificacion);
router.delete("/:id", authMiddleware.isAdminOrProfesor, calificacionController.deleteCalificacion);

module.exports = router;
