const Estadistica = require("../models/estadistica.model");
const Curso = require("../models/curso.model");
const User = require("../models/user.model");
const Role = require("../models/role.model");


// Crear una nueva estadistica
async function createEstadistica(req, res) {
  try {
    const fechaActual = new Date();

    // Obtener el ID de los roles correspondientes (alumno, profesor, admin)
    const alumnoRole = await Role.findOne({ name: 'alumno' });
    const profesorRole = await Role.findOne({ name: 'profesor' });
    const adminRole = await Role.findOne({ name: 'admin' });

    // Contar la cantidad de usuarios por cada rol
    const totalAlumnos = await User.countDocuments({ roles: alumnoRole });
    const totalProfesores = await User.countDocuments({ roles: profesorRole });
    const totalAdmins = await User.countDocuments({ roles: adminRole });

    // Contar la cantidad total de cursos
    const totalCursos = await Curso.countDocuments();

    // Obtener la cantidad de alumnos por cada curso
    const cursos = await Curso.find();
    const alumnosPorCurso = [];
    for (const curso of cursos) {
      const cantidadAlumnos = curso.alumnos.length;
      alumnosPorCurso.push({ curso: curso._id, cantidad: cantidadAlumnos });
    }

    // Obtener la lista de cursos agrupados por estado
    const cursosDisponibles = await Curso.find({ estado: 'Disponible' }, { _id: 1, nombre: 1 });
    const cursosProximos = await Curso.find({ estado: 'Proximo' }, { _id: 1, nombre: 1 });
    const cursosCerrados = await Curso.find({ estado: 'Cerrado' }, { _id: 1, nombre: 1 });

    // Calcular el porcentaje de aprobación promedio de cada curso
    const cursosConPorcentajeAprobacion = [];
    for (const curso of cursos) {
      const cantidadAlumnos = curso.alumnos.length;
      let cantidadAprobados = 0;

      for (const alumno of curso.alumnos) {
        if (alumno.estado === 'Aprobado') {
          cantidadAprobados++;
        }
      }

      const porcentajeAprobacion = cantidadAlumnos > 0 ? (cantidadAprobados / cantidadAlumnos) * 100 : 0;

      cursosConPorcentajeAprobacion.push({
        curso: curso._id,
        porcentaje: porcentajeAprobacion,
      });
    }

    // Crear objetos de estado y cursos con ID y nombre
    const cursosPorEstado = [
      { estado: 'Disponible', cursos: cursosDisponibles },
      { estado: 'Proximo', cursos: cursosProximos },
      { estado: 'Cerrado', cursos: cursosCerrados },
    ];

    const estadistica = new Estadistica({
      fecha_creacion: fechaActual,
      usuarios_por_rol: [
        { rol: alumnoRole, cantidad: totalAlumnos },
        { rol: profesorRole, cantidad: totalProfesores },
        { rol: adminRole, cantidad: totalAdmins }
      ],
      total_cursos: totalCursos,
      alumnos_por_curso: alumnosPorCurso,
      cursos_por_estado: cursosPorEstado,
      porcentaje_aprobacion: cursosConPorcentajeAprobacion,
    });

    const estadisticaGuardada = await estadistica.save();

    res.status(200).json(estadisticaGuardada);
  } catch (error) {
    console.error('Error al crear la estadística:', error);
    res.status(500).json({ error: 'Error al crear la estadística' });
  }
}


// Obtener todas las estadísticas
async function getEstadisticas(req, res) {
  try {
    const estadisticas = await Estadistica.find();

    res.status(200).json(estadisticas);
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
}

// Eliminar una estadística por su ID
async function deleteEstadistica(req, res) {
  try {
    const estadisticaId = req.params.id;

    const estadisticaEliminada = await Estadistica.findByIdAndDelete(estadisticaId);

    if (!estadisticaEliminada) {
      return res.status(404).json({ error: 'Estadística no encontrada' });
    }

    res.status(200).json({ message: 'Estadística eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la estadística:', error);
    res.status(500).json({ error: 'Error al eliminar la estadística' });
  }
}

// Eliminar todas las estadísticas
async function deleteAllEstadisticas(req, res) {
  try {
    const resultado = await Estadistica.deleteMany({});

    res.status(200).json({ message: 'Todas las estadísticas han sido eliminadas' });
  } catch (error) {
    console.error('Error al eliminar todas las estadísticas:', error);
    res.status(500).json({ error: 'Error al eliminar todas las estadísticas' });
  }
}


module.exports = {
  createEstadistica,
  getEstadisticas,
  deleteEstadistica,
  deleteAllEstadisticas
};
