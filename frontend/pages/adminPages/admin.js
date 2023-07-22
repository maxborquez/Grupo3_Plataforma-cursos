import { Box, Heading, Button, Stack } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Elimina la cookie que contiene el token JWT
    Cookies.remove('jwtToken');
    // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    router.push('/login');
  };

  return (
    <Box display="flex">
      {/* Barra lateral */}
      <Box
        bg="black"
        color="white"
        w="202px"
        h="853.145px"
        flexShrink={0}
        mb={4}
        mt={4}
        ml={18} // Ajusta el valor para el margen izquierdo deseado (18px)
        p={4}
        borderRadius="10px" // Ajusta el valor para obtener esquinas más o menos redondeadas
        fontFamily="Baloo Bhai, sans-serif" // Agregar la fuente Baloo Bhai a la barra lateral
      >
        <Stack spacing={4}>
          {/* Aquí coloca cualquier contenido adicional para la barra lateral */}
          <Button onClick={() => router.push('/admin')} variant="ghost" color="white" colorScheme="whiteAlpha">
            Página principal
          </Button>
          <Button onClick={() => router.push('/admin/cursos')} variant="ghost" color="white" colorScheme="whiteAlpha">
            Cursos
          </Button>
          <Button onClick={handleLogout} variant="ghost" color="white" colorScheme="whiteAlpha">
            Logout
          </Button>
        </Stack>
      </Box>

      {/* Contenido principal */}
      <Box p={4} mt={4} fontFamily="Baloo Bhai, sans-serif"> {/* Agregar la fuente Baloo Bhai al contenido principal */}
        <Heading as="h1" size="xl">
          Hola Mundo - Página de Admin
        </Heading>
        {/* Aquí coloca el contenido de tu página de administrador */}
      </Box>
    </Box>
  );
};

export default AdminPage;
