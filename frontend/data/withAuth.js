// withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserRole } from './auth'; // Importar la función para obtener el rol del usuario desde el token

const withAuth = (WrappedComponent, allowedRoles = []) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('jwtToken'); // Obtener el token de las cookies
      const userRoles = getUserRole(); // Obtener el rol del usuario desde el token decodificado

      // Si no hay token y la página no es la de inicio de sesión, redirige a la página de inicio de sesión
      if (!token && router.pathname !== '/login') {
        router.push('/login');
      } else if (token && !userRoles.includes(allowedRoles)) {
        // Si hay token pero el rol no está permitido para acceder a la página, redirige a la página de acceso no autorizado
        router.push('/unauthorized');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  // Asignar el nombre de visualización al componente para cumplir con la regla de ESLint
  ComponentWithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
};

// Función auxiliar para obtener el nombre de visualización de un componente
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
