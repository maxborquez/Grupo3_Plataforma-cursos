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
        source: '/adminPages/cursoEditar/:cursoId', // Ruta con parámetro cursoId
        destination: '/adminPages/cursoEditar', // Ruta del componente cursoEditar.js
      },
    ];
  },
}

module.exports = nextConfig;
