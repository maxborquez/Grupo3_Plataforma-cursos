import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Button } from '@chakra-ui/react';
import { getCursos } from '../../data/cursosData'; // Asegúrate de proporcionar la ruta correcta a tu archivo cursosData.js
import SidebarAlumno from '../../components/sideBarAlumno'; // Importa el componente Sidebar

const AlumnoPage = () => {
  const router = useRouter(); // Importa useRouter
  const [cursos, setCursos] = useState([]);

  // Llamar a la función loadCursos al cargar la página para obtener la lista de cursos
  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    try {
      const cursosData = await getCursos();
      setCursos(cursosData.data);
    } catch (error) {
      // Manejo de errores aquí si es necesario
      console.error('Error al cargar los cursos:', error);
    }
  };

  // Función para redireccionar a la página alumnoCursoVer con el ID del curso
  const handleVerCurso = (cursoId) => {
    router.push(`/alumnoPages/alumnoCursoVer/${cursoId}`);
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* Barra lateral */}
      <SidebarAlumno />

      {/* Contenido principal */}
      <Box bg="negro-sec" color="cafe" p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif">
        <Heading color="blanco" as="h1" size="xl" textAlign="center" mb={4}>
          Lista de Cursos
        </Heading>
        <Box
          p={4}
          borderRadius="10px"
          bg="amarillo"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <ul>
            {cursos.map((curso) => (
              <li key={curso._id}>
                {curso.nombre}{' '}
                <Button
                  bg="cafe"
                  color="blanco"
                  size="sm"
                  ml="100"
                  onClick={() => handleVerCurso(curso._id)} // Llama a handleVerCurso con el ID del curso
                >
                  Ver
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default AlumnoPage;
