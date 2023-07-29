import React, { useState, useEffect } from 'react';
import { Select, Button, VStack, Box, Heading } from '@chakra-ui/react';
import { getCursos, inscribirAlumnoEnCurso } from '../../data/cursosData';
import { getUserId } from '../../data/auth'; // Importamos getUserId desde el archivo auth
import Sidebar from '../../components/sideBarAlumno';

const InscribirsePage = () => {
  const [cursos, setCursos] = useState([]);
  const [selectedCursoId, setSelectedCursoId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchCursosData();
    const userId = getUserId(); // Obtenemos el ID del usuario actual
    setUserId(userId);
  }, []);

  const fetchCursosData = async () => {
    try {
      const cursosData = await getCursos();
      setCursos(cursosData.data);
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    }
  };

  const handleInscribirAlumnoClick = async () => {
    try {
      // Aquí usamos el ID del usuario y el ID del curso seleccionado para inscribir al alumno
      await inscribirAlumnoEnCurso(selectedCursoId, userId);
      // Colocar aquí cualquier lógica adicional después de inscribir al alumno
      console.log('Alumno inscrito correctamente en el curso.');
    } catch (error) {
      console.error('Error al inscribir al alumno en el curso:', error);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box bg="transparent" borderRadius="8px" ml={10} mt={5} mb={5} mr={10} flexGrow={1}>
        <Box bg="negro-sec" border="1px solid #CBD5E0" ml={10} mt={5} mb={10} mr={10} borderRadius="8px" p={4}>
          <Heading as="h1" size="xl">
            Inscribir alumno en un curso
          </Heading>
        </Box>
        <Box flex="2" bg="negro-sec" borderRadius="8px" p={4} ml={10} mt={5} mb={5} mr={10}>
          <VStack spacing={4}>
            <Select bg="amarillo" color="cafe" placeholder="Seleccionar curso" value={selectedCursoId} onChange={(e) => setSelectedCursoId(e.target.value)}>
              {cursos.map((curso) => (
                <option key={curso._id} value={curso._id}>
                  {curso.nombre}
                </option>
              ))}
            </Select>
            <br />
            <Button bg="cafe" color="blanco" onClick={handleInscribirAlumnoClick}>
              Inscribir alumno
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default InscribirsePage;
