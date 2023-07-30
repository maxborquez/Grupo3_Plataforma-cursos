const Curso = require("../models/curso.model");
const User = require("../models/user.model");


  async function getCursos() {
    const cursos = await Curso.find().populate("profesor", "nombre apellido");
    return cursos;
  }

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

  async function createCurso(profesorId, cursoData) {
    const profesor = await User.findById(profesorId);
    const curso = new Curso({ profesor, ...cursoData });
    await curso.save();
    return curso;
  }

  async function updateCurso(id, profesorId, cursoData) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { profesor: profesorId, ...cursoData },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  async function deleteCurso(id) {
    const curso = await Curso.findByIdAndDelete(id).populate("profesor", "nombre");
    return curso;
  }

  async function changeEstadoCurso(id, estado) {
    const curso = await Curso.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  async function changeProfesor(id, profesorId) {
    const profesor = await User.findById(profesorId);
    const curso = await Curso.findByIdAndUpdate(
      id,
      { profesor },
      { new: true }
    ).populate("profesor", "nombre");
    return curso;
  }

  async function getCursosByProfesor(profesorId) {
    const cursos = await Curso.find({ profesor: profesorId }).populate("profesor", "nombre");
    return cursos;
  }

async function inscribirAlumnoEnCurso(cursoId, alumnoId) {
  try {
    const curso = await Curso.findById(cursoId);
    if (curso.alumnos.some(alumno => alumno.alumno.toString() === alumnoId)) {
      throw new Error('El alumno ya está inscrito en este curso.');
    }

    const updatedCurso = await Curso.findByIdAndUpdate(
      cursoId,
      { $push: { alumnos: { alumno: alumnoId } } },
      { new: true }
    );

    return updatedCurso;
  } catch (error) {
    throw new Error("Error al inscribir el alumno en el curso: " + error.message);
  }
}


async function eliminarAlumno(cursoId, alumnoId) {
  try {

    const curso = await Curso.findById(cursoId);
    if (!curso.alumnos.some(alumno => alumno.alumno.toString() === alumnoId)) {
      throw new Error('El alumno no está inscrito en este curso.');
    }

    const updatedCurso = await Curso.findByIdAndUpdate(
      cursoId,
      { $pull: { alumnos: { alumno: alumnoId } } },
      { new: true }
    ).populate("profesor", "nombre");

    return updatedCurso;
  } catch (error) {
    throw new Error("Error al eliminar el alumno del curso: " + error.message);
  }
}


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
