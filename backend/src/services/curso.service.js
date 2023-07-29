const Curso = require("../models/curso.model");
const User = require("../models/user.model");


  async function getCursos() {
    const cursos = await Curso.find().populate("profesor", "nombre apellido");
    return cursos;
  }

  // Obtener un curso por su ID
  async function getCursoById(id) {
  try {
    const curso = await Curso.findById(id)
      .populate("profesor")
      .populate({
        path: "alumnos.alumno",
        model: "User",
      })
      .populate("clases")
      .populate("avisos")
      .populate("calificaciones")
      .exec();

    return curso;
  } catch (error) {
    throw new Error("Error al obtener el curso por ID");
  }
}
  // Crear un nuevo curso
  async function createCurso(profesorId, cursoData) {
    const profesor = await User.findById(profesorId);
    const curso = new Curso({ profesor, ...cursoData });
    await curso.save();
    return curso;
  }

  // Actualizar un curso por su ID
  async function updateCurso(id, profesorId, cursoData) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { profesor: profesorId, ...cursoData },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Eliminar un curso por su ID
  async function deleteCurso(id) {
    const curso = await Curso.findByIdAndDelete(id).populate("profesor", "nombre");
    return curso;
  }

  // Cambiar el estado de un curso
  async function changeEstadoCurso(id, estado) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Cambiar el profesor de un curso
  async function changeProfesor(id, profesorId) {
    const profesor = await User.findById(profesorId);
    const curso = await Curso.findByIdAndUpdate(
      id,
      { profesor },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Obtener cursos de un profesor
  async function getCursosByProfesor(profesorId) {
    const cursos = await Curso.find({ profesor: profesorId }).populate("profesor", "nombre");
    return cursos;
  }

// Inscribir un alumno en un curso
async function inscribirAlumnoEnCurso(cursoId, alumnoId) {
  try {
    const curso = await Curso.findByIdAndUpdate(
      cursoId,
      { $push: { alumnos: { alumno: alumnoId } } }, // Agregar al alumno al array de alumnos
      { new: true }
    );

    return curso;
  } catch (error) {
    throw new Error("Error al inscribir el alumno en el curso: " + error.message);
  }
}

  // Eliminar un alumno de un curso
  async function eliminarAlumno(id, alumnoId) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { $pull: { alumnos: alumnoId } },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Cambiar el estado de un alumno en un curso
  async function cambiarEstadoAlumno(id, alumnoId, estado) {
    const curso = await Curso.findOneAndUpdate(
      { _id: id, alumnos: alumnoId },
      { $set: { "alumnos.$.estado": estado } },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
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
