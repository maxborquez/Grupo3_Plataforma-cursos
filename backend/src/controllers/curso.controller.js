const Curso = require("../models/curso");

// Obtener todos los cursos
const getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener los cursos" });
  }
};

// Obtener un curso por su ID
const getCursoById = async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await Curso.findById(id);
    if (!curso) {
      return res.status(404).json({ error: "No se encontró el curso" });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener el curso" });
  }
};

// Crear un nuevo curso
const createCurso = async (req, res) => {
  const { nombre, descripcion, estado, fecha_inicio, fecha_fin, profesor } = req.body;
  try {
    const curso = new Curso({
      nombre,
      descripcion,
      estado,
      fecha_inicio,
      fecha_fin,
      profesor,
    });
    const nuevoCurso = await curso.save();
    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al crear el curso" });
  }
};

// Actualizar un curso
const updateCurso = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado, fecha_inicio, fecha_fin, profesor } = req.body;
  try {
    const curso = await Curso.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        estado,
        fecha_inicio,
        fecha_fin,
        profesor,
      },
      { new: true }
    );
    if (!curso) {
      return res.status(404).json({ error: "No se encontró el curso" });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al actualizar el curso" });
  }
};

// Eliminar un curso
const deleteCurso = async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await Curso.findByIdAndDelete(id);
    if (!curso) {
      return res.status(404).json({ error: "No se encontró el curso" });
    }
    res.status(200).json({ message: "Curso eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al eliminar el curso" });
  }
};

// Cambiar el estado de un curso
const changeEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
      const curso = await Curso.findByIdAndUpdate(
        id,
        { estado },
        { new: true }
      );
      if (!curso) {
        return res.status(404).json({ error: "No se encontró el curso" });
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al cambiar el estado del curso" });
    }
  };

// Cambiar el profesor de un curso
const changeProfesor = async (req, res) => {
    const { id } = req.params;
    const { nuevoProfesor } = req.body;
    try {
      const curso = await Curso.findByIdAndUpdate(
        id,
        { profesor: nuevoProfesor },
        { new: true }
      );
      if (!curso) {
        return res.status(404).json({ error: "No se encontró el curso" });
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al cambiar el profesor del curso" });
    }
  };

// Obtener todos los cursos de un profesor
const getCursosByProfesor = async (req, res) => {
  const { profesorId } = req.params;
  try {
    const cursos = await Curso.find({ profesor: profesorId });
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener los cursos del profesor" });
  }
};

// Inscribir a un alumno en un curso
const inscribirAlumno = async (req, res) => {
  const { alumnoId, cursoId } = req.params;
  try {
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      return res.status(404).json({ error: "No se encontró el curso" });
    }

    // Verificar si el curso está en estado "disponible"
    const estadoDisponible = await Estado.findOne({ name: "Disponible" });
    if (!estadoDisponible) {
      return res.status(500).json({ error: "No se encontró el estado de curso 'Disponible'" });
    }
    if (curso.estado.toString() !== estadoDisponible._id.toString()) {
      return res.status(400).json({ error: "El curso no está en estado 'Disponible'" });
    }

    // Verificar que el usuario sea un alumno
    const alumnoRole = await Role.findOne({ name: "alumno" });
    if (!alumnoRole) {
      return res.status(500).json({ error: "No se encontró el rol de alumno" });
    }
    const usuario = await User.findById(alumnoId);
    if (!usuario) {
      return res.status(404).json({ error: "No se encontró el usuario" });
    }
    if (!usuario.roles.includes(alumnoRole._id)) {
      return res.status(403).json({ error: "El usuario no tiene el rol de alumno" });
    }

    // Verificar si el alumno ya está inscrito en el curso
    if (curso.alumnos.includes(alumnoId)) {
      return res.status(400).json({ error: "El alumno ya está inscrito en el curso" });
    }

    // Inscribir al alumno en el curso
    curso.alumnos.push(alumnoId);
    await curso.save();

    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al inscribir al alumno en el curso" });
  }
};

// Cambiar el estado de un alumno en un curso (aprobado, reprobado, cursando)
const cambiarEstadoAlumno = async (req, res) => {
  const { cursoId, alumnoId } = req.params;
  const { estado } = req.body;

  try {
    // Verificar si el curso y el alumno existen
    const curso = await Curso.findById(cursoId);
    const alumno = await User.findById(alumnoId);

    if (!curso || !alumno) {
      return res.status(404).json({ error: "Curso o alumno no encontrado" });
    }

    // Verificar si el usuario que realiza la solicitud es el profesor del curso
    // Aquí debes agregar la lógica para verificar si el usuario actual tiene los permisos adecuados

    // Actualizar el estado del alumno en el curso
    curso.alumnos.forEach((alumnoCurso) => {
      if (alumnoCurso.alumno.toString() === alumnoId) {
        alumnoCurso.estado = estado;
      }
    });

    await curso.save();

    res.status(200).json({ mensaje: "Estado del alumno actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al cambiar el estado del alumno" });
  }
};

// Eliminar un alumno de un curso
const eliminarAlumno = async (req, res) => {
  const { cursoId, alumnoId } = req.params;

  try {
    // Verificar si el curso y el alumno existen
    const curso = await Curso.findById(cursoId);
    const alumno = await User.findById(alumnoId);

    if (!curso || !alumno) {
      return res.status(404).json({ error: "Curso o alumno no encontrado" });
    }

    // Verificar si el usuario que realiza la solicitud es el profesor del curso
    // Aquí debes agregar la lógica para verificar si el usuario actual tiene los permisos adecuados

    // Eliminar al alumno del curso
    curso.alumnos = curso.alumnos.filter((alumnoCurso) => {
      return alumnoCurso.alumno.toString() !== alumnoId;
    });

    await curso.save();

    res.status(200).json({ mensaje: "Alumno eliminado del curso correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al eliminar al alumno del curso" });
  }
};


module.exports = {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  changeEstado,
  changeProfesor,
  getCursosByProfesor,
  inscribirAlumno,
  cambiarEstadoAlumno,
  eliminarAlumno,
};
