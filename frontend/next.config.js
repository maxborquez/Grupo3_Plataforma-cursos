const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/adminPages/cursoDetalle/:cursoId',
        destination: '/adminPages/cursoDetalle', // Ruta del componente cursoDetalle.js
      },
      {
        source: '/profesorPages/cursosProfeVer/:cursoId',
        destination: '/profesorPages/cursosProfeVer', // Ruta del componente cursosProfeVer.js
      },
      {
        source: '/profesorPages/cursosProfe/:profesorId',
        destination: '/profesorPages/cursosProfe', // Ruta del componente CursosProfe.js
      },
      {
        source: '/profesorPages/crearAviso/:cursoId',
        destination: '/profesorPages/crearAviso', // Ruta del componente CrearAviso.js
      },
      {
        source: '/adminPages/cursoEditar/:cursoId', // Ruta con parámetro cursoId
        destination: '/adminPages/cursoEditar', // Ruta del componente cursoEditar.js
      },
      // Ruta dinámica para la página de detalle del usuario
      {
        source: '/adminPages/usuarioDetalle/:userId',
        destination: '/adminPages/usuarioDetalle', // Ruta del componente usuarioDetalle.js
      },
      // Ruta dinámica para la página de edición del usuario
      {
        source: '/adminPages/usuarioEditar/:userId',
        destination: '/adminPages/usuarioEditar', // Ruta del componente usuarioEditar.js
      },
    ];
  },
};

module.exports = nextConfig;
