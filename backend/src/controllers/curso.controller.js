const CursoService = require("../services/curso.service");
const { respondSuccess, respondError } = require("../utils/resHandler");

// Obtener todos los cursos
async function getCursos(req, res) {
  try {
    const cursos = await CursoService.getCursos();
    respondSuccess(req, res, 200, cursos);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al obtener los cursos");
  }
}

// Obtener un curso por su ID
async function getCursoById(req, res) {
  try {
    const { id } = req.params;
    const curso = await CursoService.getCursoById(id);
    curso === null
      ? respondError(req, res, 404, "No se encontró el curso", "Not Found")
      : respondSuccess(req, res, 200, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al obtener el curso");
  }
}

// Crear un nuevo curso
async function createCurso(req, res) {
  try {
    const { profesorId, ...rest } = req.body;
    const curso = await CursoService.createCurso(profesorId, rest);
    respondSuccess(req, res, 201, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al crear el curso");
  }
}

// Actualizar un curso por su ID
async function updateCurso(req, res) {
  try {
    const { id } = req.params;
    const { profesorId, ...rest } = req.body;
    const curso = await CursoService.updateCurso(id, profesorId, rest);
    curso === null
      ? respondError(req, res, 404, "No se encontró el curso", "Not Found")
      : respondSuccess(req, res, 200, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al actualizar el curso");
  }
}

// Eliminar un curso por su ID
async function deleteCurso(req, res) {
  try {
    const { id } = req.params;
    const curso = await CursoService.deleteCurso(id);
    curso === null
      ? respondError(req, res, 404, "No se encontró el curso", "Not Found")
      : respondSuccess(req, res, 200, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al eliminar el curso");
  }
}

// Cambiar el estado de un curso
async function changeEstadoCurso(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const curso = await CursoService.changeEstadoCurso(id, estado);
    curso === null
      ? respondError(req, res, 404, "No se encontró el curso", "Not Found")
      : respondSuccess(req, res, 200, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al cambiar el estado del curso");
  }
}

// Cambiar el profesor de un curso
async function changeProfesor(req, res) {
  try {
    const { id } = req.params;
    const { profesorId } = req.body;
    const curso = await CursoService.changeProfesor(id, profesorId);
    curso === null
      ? respondError(req, res, 404, "No se encontró el curso", "Not Found")
      : respondSuccess(req, res, 200, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al cambiar el profesor del curso");
  }
}

// Obtener cursos de un profesor
async function getCursosByProfesor(req, res) {
  try {
    const { profesorId } = req.params;
    const cursos = await CursoService.getCursosByProfesor(profesorId);
    respondSuccess(req, res, 200, cursos);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al obtener los cursos del profesor");
  }
}

// Inscribir un alumno en un curso
async function inscribirAlumnoEnCurso(req, res) {
  try {
    const { cursoId, alumnoId } = req.params; // Obtiene los IDs desde los parámetros de ruta
    const curso = await CursoService.inscribirAlumnoEnCurso(cursoId, alumnoId);
    if (curso === null) {
      return respondError(req, res, 404, "No se encontró el curso", "Not Found");
    }
    return respondSuccess(req, res, 200, curso);
  } catch (error) {
    return respondError(req, res, 500, "Ocurrió un error al inscribir al alumno en el curso");
  }
}


// Eliminar un alumno de un curso
async function eliminarAlumno(req, res) {
  try {
    const { id } = req.params;
    const { alumnoId } = req.body;
    const curso = await CursoService.eliminarAlumno(id, alumnoId);
    curso === null
      ? respondError(req, res, 404, "No se encontró el curso", "Not Found")
      : respondSuccess(req, res, 200, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al eliminar al alumno del curso");
  }
}

// Cambiar el estado de un alumno en un curso
async function cambiarEstadoAlumno(req, res) {
  try {
    const { id } = req.params;
    const { alumnoId, estado } = req.body;
    const curso = await CursoService.cambiarEstadoAlumno(id, alumnoId, estado);
    curso === null
      ? respondError(req, res, 404, "No se encontró el curso", "Not Found")
      : respondSuccess(req, res, 200, curso);
  } catch (error) {
    respondError(req, res, 500, "Ocurrió un error al cambiar el estado del alumno en el curso");
  }
}

module.exports = {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  changeEstadoCurso,
  changeProfesor,
  getCursosByProfesor,
  inscribirAlumnoEnCurso,
  eliminarAlumno,
  cambiarEstadoAlumno,
};
