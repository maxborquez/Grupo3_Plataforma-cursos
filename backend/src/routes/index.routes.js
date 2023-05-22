"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el enrutador de usuarios
const userRoutes = require("./user.routes.js");
// Importa el enrutador de autenticación
const authRoutes = require("./auth.routes.js");
// Importa el middleware de autenticación
const authMiddleware = require("../middlewares/authe.middleware.js");
const asistenciaRoutes = require("./asistencia.routes.js");
const avisoRoutes = require("./aviso.routes.js");
const calificacionRoutes = require("./calificacion.routes.js");
const claseRoutes = require("./clase.routes.js");
const cursoRoutes = require("./curso.routes.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authMiddleware.verifyToken, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
router.use("/asistencias", authMiddleware.verifyToken, asistenciaRoutes);
router.use("/avisos", authMiddleware.verifyToken, avisoRoutes);
router.use("/calificaciones", authMiddleware.verifyToken, calificacionRoutes);
router.use("/clases", authMiddleware.verifyToken, claseRoutes);
router.use("/cursos", authMiddleware.verifyToken, cursoRoutes);


// Exporta el enrutador
module.exports = router;
