import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getCursoById } from '../../data/cursosData'; // Importa la función para obtener el curso por ID

const cursosProfeVer = () => {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID del curso desde el parámetro de la ruta
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerCurso();
  }, [id]); // Vuelve a obtener el curso cuando el ID cambie

  const obtenerCurso = async () => {
    try {
      const cursoObtenido = await getCursoById(id);
      setCurso(cursoObtenido);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener el curso:', error);
      setError('Error al obtener el curso. Por favor, intenta nuevamente más tarde.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!curso) {
    return <div>No se encontró el curso.</div>;
  }

  return (
    <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif">
      <Heading as="h1" size="xl" mb={4}>
        {curso.nombre}
      </Heading>
      <Box bg="gray.200" p={4} borderRadius="md">
        <Text>
          <strong>Descripción:</strong> {curso.descripcion}
        </Text>
        <Text>
          <strong>Estado:</strong> {curso.estado}
        </Text>
        <Text>
          <strong>Fecha de inicio:</strong> {new Date(curso.fecha_inicio).toLocaleDateString()}
        </Text>
        <Text>
          <strong>Fecha de fin:</strong> {new Date(curso.fecha_fin).toLocaleDateString()}
        </Text>
        {/* Agrega más detalles del curso según sea necesario */}
      </Box>
    </Box>
  );
};

export default cursosProfeVer;
