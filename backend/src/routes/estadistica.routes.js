"use strict";
// Importa el módulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de asistencia
const estadisticaController = require("../controllers/estadistica.controller.js");
// Importa el middleware de autorización
const authMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para la asistencia
router.post("/", estadisticaController.createEstadistica);
router.get("/", estadisticaController.getEstadisticas);
router.get("/:id", estadisticaController.getEstadisticaById);
router.delete("/:id", estadisticaController.deleteEstadistica);

// Exporta el enrutador
module.exports = router;
