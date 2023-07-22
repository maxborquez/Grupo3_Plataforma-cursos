import { Box, Heading, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const ProfesorPage = () => {
  const router = useRouter();

  // Función para realizar el logout y redirigir a la página de inicio de sesión
  const handleLogout = () => {
    // Elimina la cookie que contiene el token JWT
    Cookies.remove('jwtToken');
    // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    router.push('/login');
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl">
        Hola Mundo - Página de Profesor
      </Heading>
      <Button mt={4} colorScheme="teal" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default ProfesorPage;
