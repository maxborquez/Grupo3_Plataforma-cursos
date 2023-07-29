import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { crearAviso } from '../../data/avisosData';
import { getUserId } from '../../data/auth';
import { Box, Heading, Button, VStack, FormControl, FormLabel, Textarea, HStack } from '@chakra-ui/react';

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
      router.back();
    } catch (error) {
      console.error('Error al crear el aviso:', error);
      // Lógica para manejar errores
    }
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <Box p={2} maxWidth="600px" margin="0 auto" bg="amarillo" border="1px solid gray" borderRadius="md" marginTop="20px">
      <Box p={4} bg="negro-sec" borderRadius="8px">
        <Heading as="h1" size="xl" textAlign="center" mb={4} color="blanco">
          Crear Aviso
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack align="flex-start">
            <FormControl>
              <FormLabel>Contenido:</FormLabel>
              <Textarea value={contenido} onChange={(e) => setContenido(e.target.value)} />
            </FormControl>
            <HStack spacing={4}>
              <Button bg="verde" color="blanco" type="submit" onClick={handleSubmit}>
                Crear Aviso
              </Button>
              <Button bg="naranja" color="blanco" onClick={handleVolverClick}>
                Volver
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CrearAvisoPage;
