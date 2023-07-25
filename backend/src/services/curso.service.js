const Curso = require("../models/curso.model");
const User = require("../models/user.model");

class CursoService {
  // Obtener todos los cursos
  static async getCursos() {
    const cursos = await Curso.find().populate("profesor", "nombre apellido");
    return cursos;
  }

  // Obtener un curso por su ID
  static async getCursoById(id) {
    const curso = await Curso.findById(id).populate("profesor", "nombre apellido");
    return curso;
  }

  // Crear un nuevo curso
  static async createCurso(profesorId, cursoData) {
    const profesor = await User.findById(profesorId);
    const curso = new Curso({ profesor, ...cursoData });
    await curso.save();
    return curso;
  }

  // Actualizar un curso por su ID
  static async updateCurso(id, profesorId, cursoData) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { profesor: profesorId, ...cursoData },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Eliminar un curso por su ID
  static async deleteCurso(id) {
    const curso = await Curso.findByIdAndDelete(id).populate("profesor", "nombre");
    return curso;
  }

  // Cambiar el estado de un curso
  static async changeEstadoCurso(id, estado) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Cambiar el profesor de un curso
  static async changeProfesor(id, profesorId) {
    const profesor = await User.findById(profesorId);
    const curso = await Curso.findByIdAndUpdate(
      id,
      { profesor },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Obtener cursos de un profesor
  static async getCursosByProfesor(profesorId) {
    const cursos = await Curso.find({ profesor: profesorId }).populate("profesor", "nombre");
    return cursos;
  }

  // Inscribir un alumno en un curso
  static async inscribirAlumnoEnCurso(id, alumnoId) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { $push: { alumnos: alumnoId } },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Eliminar un alumno de un curso
  static async eliminarAlumno(id, alumnoId) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { $pull: { alumnos: alumnoId } },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  // Cambiar el estado de un alumno en un curso
  static async cambiarEstadoAlumno(id, alumnoId, estado) {
    const curso = await Curso.findOneAndUpdate(
      { _id: id, alumnos: alumnoId },
      { $set: { "alumnos.$.estado": estado } },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }
}

module.exports = CursoService;
