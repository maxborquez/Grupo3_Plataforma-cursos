import { Box, Heading, Button } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import withAuth from '../../data/withAuth';

const EstadisticasAdminPage = () => {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <Box p={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif" display="flex">
        {/* Recuadro con el botón verde */}
        <Box
          flex="1"
          p={4}
          borderRadius="10px"
          bg="gray.300"
          textAlign="center"
          display="flex"
          alignItems="center"
          position="relative"
        >
          <Button
            colorScheme="green"
            size="md"
            position="absolute"
            top={2}
            right={2}
          >
            +
          </Button>
          <Heading as="h1" size="xl">
            Parte 2 para EstadisticasAdminPage
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(EstadisticasAdminPage, 'admin');
