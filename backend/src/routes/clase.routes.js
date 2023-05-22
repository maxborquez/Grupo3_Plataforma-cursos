"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de clases
const claseController = require("../controllers/clase.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/auth.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para las clases
router.get("/", authMiddleware.isAuthenticated, claseController.obtenerClases);
router.get("/:id", authMiddleware.isAuthenticated, claseController.obtenerClasePorId);
router.post("/", authMiddleware.isProfesor, claseController.crearClase);
router.put("/:id", authMiddleware.isProfesor, claseController.actualizarClase);
router.delete("/:id", authMiddleware.isProfesor, claseController.eliminarClase);

// Exporta el enrutador
module.exports = router;
