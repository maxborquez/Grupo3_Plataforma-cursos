"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de cursos
const cursoController = require("../controllers/curso.controller.js");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los cursos
router.get("/", cursoController.getCursos);
router.post("/", authoMiddleware.isAdmin, cursoController.createCurso);
router.get("/:id", cursoController.getCursoById);
router.put("/:id", authoMiddleware.isAdmin, cursoController.updateCurso);
router.delete("/:id", authoMiddleware.isAdmin, cursoController.deleteCurso);

// Rutas adicionales para funcionalidades específicas del controlador de cursos
router.put("/:id/estado", authoMiddleware.isAdmin, cursoController.changeEstadoCurso);
router.put("/:id/profesor", authoMiddleware.isAdmin, cursoController.changeProfesor);
router.get("/profesor/:profesorId", cursoController.getCursosByProfesor);
router.post("/:cursoId/inscribir", cursoController.inscribirAlumnoEnCurso);
router.put("/:cursoId/alumno/:alumnoId/estado", authoMiddleware.isAdminOrProfesor, cursoController.cambiarEstadoAlumno,
);
router.delete("/:cursoId/alumno/:alumnoId", authoMiddleware.isAdminOrProfesor, cursoController.eliminarAlumno,);

// Exporta el enrutador
module.exports = router;
