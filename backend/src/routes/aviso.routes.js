"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de avisos
const avisoController = require("../controllers/aviso.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los avisos
router.get("/curso/:cursoId", avisoController.obtenerAvisosPorCurso);
router.get("/:avisoId", avisoController.getAvisoById);
router.post("/curso/:cursoId/profesor/:profesorId", authMiddleware.isAdminOrProfesor, avisoController.crearAvisoEnCurso);
router.put("/:avisoId", authMiddleware.isAdminOrProfesor, avisoController.actualizarAviso);
router.delete("/:avisoId", authMiddleware.isAdminOrProfesor, avisoController.eliminarAviso);

// Exporta el enrutador
module.exports = router;
