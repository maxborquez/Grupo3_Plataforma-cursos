import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Button, List, ListItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { getCursoByProfesor } from '../../data/cursosData'; // Importa la función para obtener los cursos del profesor
import { getUserId, getUserRole } from '../../data/auth'; // Importa la función para obtener el ID del usuario y el rol desde el token
import SidebarProfe from '../../components/sideBarProfe'; // Importa el componente Sidebar

const CursosProfe = () => {
  const router = useRouter();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    obtenerCursos();
  }, []);

  const obtenerCursos = async () => {
    try {
      const userRoles = getUserRole();
      const token = Cookies.get('jwtToken');

      // Verifica si el usuario tiene el rol de "profesor"
      if (userRoles.includes('profesor')) {
        // Obtener el ID del profesor del token decodificado utilizando getUserId
        const profesorId = getUserId(token);

        // Enviar el ID del profesor en la solicitud para obtener los cursos asociados
        const cursosDelProfesor = await getCursoByProfesor(profesorId);
        setCursos(cursosDelProfesor.data);
      } else {
        console.log('El usuario no es un profesor, puede mostrar otro contenido aquí.');
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
      {/* Resto del código de la página... */}
      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif" display="flex">
        <Box flex="1" p={4} borderRadius="20px" bg="gray.200" textAlign="center" display="flex" alignItems="center" flexDirection="column">
          <Heading as="h1" size="xl" mb={4}>
            Cursos
          </Heading>
          <List mt={4} width="100%">
            {Array.isArray(cursos) && cursos.length > 0 ? (
              cursos.map((curso) => (
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
              ))
            ) : (
              <ListItem>No se encontraron cursos para este profesor.</ListItem>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CursosProfe;
