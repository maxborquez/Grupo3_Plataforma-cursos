// adminPages/CursosAdminPage.js
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { getCursos } from '../../data/cursosData'; // Importa la función para obtener los cursos
import withAuth from '../../data/withAuth'; // Importa el componente withAuth
import CursoItem from '../../components/CursoItem'; // Importa el componente CursoItem

const CursosAdminPage = () => {
  const [cursos, setCursos] = useState([]);

  // Función para cargar los cursos al cargar la página
  useEffect(() => {
    loadCursos();
  }, []);

  // Función para cargar los cursos desde la base de datos
  const loadCursos = async () => {
    try {
      const cursosData = await getCursos();
      setCursos(cursosData.data);
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif">
        <Box bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" p={4} mb={4}>
          <Heading as="h1" size="xl">
            Visualización de todos los cursos
          </Heading>
        </Box>

        <Box flex="2" bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" p={4}>
          <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <Heading as="h1" size="xl">
              Lista de cursos en sistema
            </Heading>
            <Button colorScheme="green" onClick={() => console.log('Agregar nuevo curso')}>
              +
            </Button>
          </Flex>
          <Box overflowY="auto" maxHeight="calc(100vh - 230px)">
            {cursos.map((curso) => (
              <CursoItem
                key={curso._id}
                curso={curso}
                onDetalleClick={(id) => {
                  // Lógica para mostrar el detalle del curso
                  console.log('Detalle del curso:', id);
                }}
                onBorrarClick={(id) => {
                  // Lógica para borrar el curso
                  console.log('Borrar el curso:', id);
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Envuelve el componente CursosAdminPage con withAuth para protegerlo
export default withAuth(CursosAdminPage, 'admin');
