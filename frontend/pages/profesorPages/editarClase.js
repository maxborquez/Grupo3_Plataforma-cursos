import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import { obtenerClasePorId, actualizarClase } from '../../data/clasesData';

const EditarClase = () => {
  const router = useRouter();
  const { claseId } = router.query;

  // Estado para almacenar los detalles de la clase
  const [clase, setClase] = useState({}); // Inicializa como un objeto vacío {}

  // Carga los detalles de la clase al cargar la página
  useEffect(() => {
    if (claseId) {
      obtenerClase();
    }
  }, [claseId]);

  // Función para obtener los detalles de la clase por su ID
  const obtenerClase = async () => {
    try {
      const claseObtenida = await obtenerClasePorId(claseId);
      setClase(claseObtenida);
    } catch (error) {
      console.error('Error al obtener la clase:', error);
    }
  };

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setClase({
      ...clase,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía la solicitud para actualizar la clase
      await actualizarClase(claseId, clase);
      // Redirige a la página anterior después de la edición exitosa
      router.back();
    } catch (error) {
      console.error('Error al editar la clase:', error);
    }
  };

  return (
    <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
      <Heading as="h1" size="lg" mb={4}>
        Editar Clase
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack align="start" spacing={4}>
          <FormControl>
            <FormLabel>Nombre de la Clase:</FormLabel>
            <Input
              name="nombre"
              value={clase.nombre || ''}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de la Clase:</FormLabel>
            <Input
              type="date"
              name="fecha"
              value={clase.fecha || ''}
              onChange={handleChange}
              required
            />
          </FormControl>
          {/* Puedes agregar más campos de la clase aquí según tu modelo */}
          <Button colorScheme="blue" type="submit">
            Guardar Cambios
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditarClase;
