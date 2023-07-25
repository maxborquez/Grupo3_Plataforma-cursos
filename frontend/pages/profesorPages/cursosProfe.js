// cursosProfe.js

import React from 'react';
import { Box, Heading, Button, List, ListItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import SidebarProfe from '../../components/sideBarProfe';
import { getCursos } from '../../data/cursosData';

const CursosProfe = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    router.push('/login');
  };

  const [cursos, setCursos] = React.useState([]);

  React.useEffect(() => {
    obtenerCursos();
  }, []);

  const obtenerCursos = async () => {
    try {
      const response = await getCursos();
      if (response.data && Array.isArray(response.data)) {
        setCursos(response.data);
      } else {
        console.error('Los datos de los cursos no son válidos:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  // Ajusta la redirección para eliminar la carpeta 'ver' del enrutamiento
  const handleVerCurso = (cursoId) => {
    router.push(`/profesorPages/cursosProfeVer/${cursoId}`);
  };

  return (
    <Box display="flex" minHeight="100vh">
      <SidebarProfe />
      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif" display="flex">
        <Box flex="1" p={4} borderRadius="20px" bg="gray.200" textAlign="center" display="flex" alignItems="center" flexDirection="column">
          <Heading as="h1" size="xl" mb={4}>
            Cursos
          </Heading>
          <List mt={4} width="100%">
            {cursos.map((curso) => (
              <Box
                key={curso._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.300"
                width="100%"
                mt={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
              >
                <Box>
                  <Heading as="h2" size="lg">
                    {curso.nombre}
                  </Heading>
                  <Box mt={2}>
                    <strong>Descripción:</strong> {curso.descripcion}
                  </Box>
                </Box>
                <Button colorScheme="blue" onClick={() => handleVerCurso(curso._id)}>
                  Ver
                </Button>
              </Box>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CursosProfe;
