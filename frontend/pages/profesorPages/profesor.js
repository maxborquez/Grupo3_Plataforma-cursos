import { Box, Heading, Button, Stack } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import SidebarProfe from '../../components/sideBarProfe'; // Importa el componente Sidebar

const ProfesorPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    router.push('/login');
  };

  return (
    <Box display="flex" minHeight="100vh">
       {/* Barra lateral */}
      <SidebarProfe /> 
      {/* Contenido principal dividido en dos partes */}
      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif" display="flex">
        {/* Primera parte, dividida horizontalmente */}
        <Box flex="2" display="flex" flexDirection="column">
          {/* Parte superior más pequeña */}
          <Box
            flex="1"
            p={4}
            borderRadius="20px" // Bordes redondeados para esta parte
            bg="gray.100" // Color de fondo para destacar la diferencia
            textAlign="center" // Centrar el contenido horizontalmente
            display="flex"
            alignItems="center" // Centrar el contenido verticalmente
            mb={18} // Margen inferior de 18px para separar de la parte inferior
          >
            <Heading as="h1" size="xl">
              Parte 1 (arriba)
            </Heading>
          </Box>

          {/* Parte inferior más grande */}
          <Box
            flex="2" // Ajustar el valor para que sea más grande que la parte de la derecha
            p={4}
            borderRadius="20px" // Bordes redondeados para esta parte
            bg="gray.200" // Color de fondo para destacar la diferencia
            textAlign="center" // Centrar el contenido horizontalmente
            display="flex"
            alignItems="center" // Centrar el contenido verticalmente
          >
            <Heading as="h1" size="xl">
              Parte 1 (abajo)
            </Heading>
          </Box>
        </Box>

        {/* Espacio de 18px para separar las partes del centro y la parte de la derecha */}
        <Box mx={18} />

        {/* Segunda parte en el lado derecho */}
        <Box
          flex="1"
          p={4}
          borderRadius="10px" // Bordes redondeados para esta parte
          bg="gray.300" // Color de fondo para destacar la diferencia
          textAlign="center" // Centrar el contenido horizontalmente
          display="flex"
          alignItems="center" // Centrar el contenido verticalmente
        >
          <Heading as="h1" size="xl">
            Parte 2
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfesorPage;