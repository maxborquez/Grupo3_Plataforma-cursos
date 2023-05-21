const express = require('express');
const router = express.Router();

const CursoController = require('../controllers/cursos');
const AlumnoController = require('../controllers/Alumno.inscripc');

router.get('/cursos', CursoController.cursos_get_all);

router.post(
  '/alumnos/:idAlumno/cursos/:idCurso',
  AlumnoController.alumnos_inscribir_curso
);

module.exports = router;