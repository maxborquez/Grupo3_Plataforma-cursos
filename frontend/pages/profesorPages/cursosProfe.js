import React from 'react'; // Agrega esta línea
import { Box, Heading, Button, Stack, List, ListItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import SidebarProfe from '../../components/sideBarProfe'; // Importa el componente Sidebar
import { getCursos } from '../../data/cursosData'; // Importa la función para obtener los cursos

const cursosProfe = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    router.push('/login');
  };

  // Estado para almacenar los cursos obtenidos del backend
  const [cursos, setCursos] = React.useState([]);

  // Función para obtener los cursos del backend al cargar la página
  React.useEffect(() => {
    obtenerCursos();
  }, []);

  // Función para obtener los cursos desde el backend
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

  // Función para redireccionar a la página del curso cuando se hace clic en el botón "Ver"
  const handleVerCurso = (cursoId) => {
    router.push(`/cursos/${cursoId}`); // Reemplaza "/cursos" con la ruta correcta de la página del curso
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* Barra lateral */}
      <SidebarProfe /> 
      {/* Contenido principal ocupando todo el centro */}
      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif" display="flex">
        {/* Parte inferior más grande */}
        <Box
          flex="1" // Ocupa todo el espacio disponible
          p={4}
          borderRadius="20px" // Bordes redondeados para esta parte
          bg="gray.200" // Color de fondo para destacar la diferencia
          textAlign="center" // Centrar el contenido horizontalmente
          display="flex"
          alignItems="center" // Centrar el contenido verticalmente
          flexDirection="column" // Alinear elementos en columna
        >
          {/* Lista de cursos */}
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
                bg="white" // Fondo blanco para el cuadro de cada curso
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

export default cursosProfe;
