const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/adminPages/cursoDetalle/:cursoId',
        destination: '/adminPages/cursoDetalle',
      },
      {
        source: '/profesorPages/cursosProfeVer/:cursoId',
        destination: '/profesorPages/cursosProfeVer',
      },
      {
        source: '/profesorPages/cursosProfe/:profesorId',
        destination: '/profesorPages/cursosProfe',
      },
      {
        source: '/profesorPages/crearAviso/:cursoId',
        destination: '/profesorPages/crearAviso',
      },
      {
        source: '/profesorPages/editarAviso/:avisoId',
        destination: '/profesorPages/editarAviso',
      },
      {
        source: '/profesorPages/calificacionesAlumnos/:cursoId',
        destination: '/profesorPages/calificacionesAlumnos',
      },
      {
        source: '/profesorPages/crearClase/:cursoId',
        destination: '/profesorPages/crearClase',
      },
      {
        source: '/profesorPages/editarClase/:claseId',
        destination: '/profesorPages/editarClase',
      },
      {
        source: '/adminPages/cursoEditar/:cursoId',
        destination: '/adminPages/cursoEditar',
      },
      {
        source: '/adminPages/usuarioDetalle/:userId',
        destination: '/adminPages/usuarioDetalle',
      },

      {
        source: '/adminPages/usuarioEditar/:userId',
        destination: '/adminPages/usuarioEditar',
      },
      {
        source: '/adminPages/estadisticaDetalle/:estadisticaId',
        destination: '/adminPages/estadisticaDetalle',
      },
      {
        source: '/alumnoPages/alumnoCursoVer/:cursoId',
        destination: '/alumnoPages/alumnoCursoVer',
      },
      {
        source: '/profesorPages/marcarAsistencia/:cursoId/:claseId',
        destination: '/profesorPages/marcarAsistencia',
      },
      {
        source: '/profesorPages/calificarAlumno/:cursoId/:alumnoId',
        destination: '/profesorPages/calificarAlumno',
      },
      {
        source: '/profesorPages/calificacionesVer/:cursoId',
        destination: '/profesorPages/calificacionesVer',
      },
      {
        source: '/profesorPages/calificacionesEditar/:calificacionId',
        destination: '/profesorPages/calificacionesEditar',
      }
    ];
  },
};

module.exports = nextConfig;
