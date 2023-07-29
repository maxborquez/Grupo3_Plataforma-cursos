import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { crearAviso } from '../../data/avisosData';
import { getUserId } from '../../data/auth';
import { Box, Heading, Text, Button, VStack, FormControl, FormLabel, Textarea } from '@chakra-ui/react';

const CrearAvisoPage = () => {
  const router = useRouter();
  const [contenido, setContenido] = useState('');
  const [profesorId, setProfesorId] = useState(null);
  const [cursoId, setCursoId] = useState(null);

  useEffect(() => {
    const profesorId = getUserId();
    setProfesorId(profesorId);

    const { cursoId } = router.query;
    setCursoId(cursoId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearAviso(cursoId, profesorId, contenido);
      // Resto del código para redireccionar a la página de avisos después de crear el aviso...
    } catch (error) {
      console.error('Error al crear el aviso:', error);
      // Lógica para manejar errores
    }
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <Box bg="black" minHeight="100vh" p={4}>
      <Box bg="white" p={4} borderRadius="8px">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Crear Aviso
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack align="flex-start">
            <FormControl>
              <FormLabel>Contenido:</FormLabel>
              <Textarea value={contenido} onChange={(e) => setContenido(e.target.value)} />
            </FormControl>
            <Button colorScheme="blue" type="submit" onClick={handleVolverClick}>
              Crear Aviso
            </Button>
            <Button colorScheme="gray" onClick={handleVolverClick}>
              Volver
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CrearAvisoPage;
