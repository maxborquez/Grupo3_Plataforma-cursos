import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserRole } from './auth';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('jwtToken');
      const userRoles = getUserRole();

      if (!token && router.pathname !== '/login') {
        router.push('/login');
      } else if (token && !userRoles.includes(allowedRoles)) {
        router.push('/unauthorized');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
};


function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
