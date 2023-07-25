import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Heading, Text, Button, HStack, Badge, VStack, Divider, List, ListItem, UnorderedList } from '@chakra-ui/react';
import { getCursoById } from '../../data/cursosData';

const CursoDetalle = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    const loadCursoDetalle = async () => {
      try {
        const response = await getCursoById(cursoId);
        if (response.state === 'Success') {
          setCurso(response.data);
        } else {
          console.error('Error al obtener los detalles del curso:', response);
        }
      } catch (error) {
        console.error('Error al cargar los detalles del curso:', error);
      }
    };

    if (cursoId) {
      loadCursoDetalle();
    }
  }, [cursoId]);

  if (!curso) {
    return <div>Cargando...</div>;
  }

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <Box p={4} bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" mt={4} mx={4}>
      <Heading as="h1" size="xl">
        {curso.nombre}
      </Heading>
      <Text fontSize="lg" color="gray.600" mt={2}>
        {curso.descripcion}
      </Text>
      <Box mt={4}>
        <Heading as="h3" size="lg">
          Información del curso
        </Heading>
        <VStack align="flex-start" mt={2} spacing={4}>
          {/* Resto de la información del curso */}
        </VStack>
      </Box>
      <HStack mt={4} justifyContent="flex-end">
        <Button colorScheme="blue" size="sm" onClick={() => console.log('Lógica para editar el curso')}>
          Editar
        </Button>
        <Button colorScheme="red" size="sm" onClick={() => console.log('Lógica para borrar el curso')}>
          Borrar
        </Button>
        <Button colorScheme="gray" size="sm" onClick={handleVolverClick}>
          Volver
        </Button>
      </HStack>
    </Box>
  );
};

export default CursoDetalle;
