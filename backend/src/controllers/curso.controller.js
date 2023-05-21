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
};
