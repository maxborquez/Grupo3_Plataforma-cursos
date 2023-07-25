/** @type {import('next').NextConfig} */
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
    ];
  },
}

module.exports = nextConfig;
