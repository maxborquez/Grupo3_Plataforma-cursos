// pages/dashboard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      router.push('/login'); // Si no hay token, redirigir al inicio de sesión.
      return;
    }

    try {
      // Decodificar el token para obtener los datos del usuario, incluido el rol.
      const decodedToken = jwt.decode(accessToken);
      const { nombre, apellido, email, rut, telefono, roles } = decodedToken;

      // Dependiendo del rol, redirigir a la página correspondiente.
      if (roles.includes('admin')) {
        router.push('/admin');
      } else if (roles.includes('profesor')) {
        router.push('/profesor');
      } else if (roles.includes('alumno')) {
        router.push('/alumno');
      } else {
        console.error('Rol de usuario desconocido.');
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }, []);

  return null; // O puede mostrar un mensaje de carga, por ejemplo.
};

export default DashboardPage;
