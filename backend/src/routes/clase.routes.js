"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de clases
const claseController = require("../controllers/clase.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las clases
router.get("/", claseController.obtenerClases);
router.get("/:id", claseController.obtenerClasePorId);
router.get("/curso/:cursoId", claseController.getClasesPorCurso);
router.post("/curso/:cursoId", authMiddleware.isAdminOrProfesor, claseController.crearClase);
router.put("/:id", authMiddleware.isAdminOrProfesor, claseController.actualizarClase);
router.delete("/:claseId/curso/:cursoId", authMiddleware.isAdminOrProfesor, claseController.eliminarClase);

// Exporta el enrutador
module.exports = router;
