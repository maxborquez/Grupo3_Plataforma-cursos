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
  HStack, // Agregamos el componente HStack
} from '@chakra-ui/react';
import { obtenerClasePorId, actualizarClase } from '../../data/clasesData';

const EditarClase = () => {
  const router = useRouter();
  const { claseId } = router.query;

  const [clase, setClase] = useState({});

  useEffect(() => {
    if (claseId) {
      obtenerClase();
    }
  }, [claseId]);

  const obtenerClase = async () => {
    try {
      const claseObtenida = await obtenerClasePorId(claseId);
      setClase(claseObtenida);
    } catch (error) {
      console.error('Error al obtener la clase:', error);
    }
  };

  const handleChange = (e) => {
    setClase({
      ...clase,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarClase(claseId, clase);
      router.back();
    } catch (error) {
      console.error('Error al editar la clase:', error);
    }
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <Box p={2} maxWidth="600px" bg="amarillo" margin="0 auto" borderWidth="1px" borderRadius="md" mt={4}>
      <Box p={4} bg="negro-sec" borderRadius="8px">
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
                bg="white"
                border="1px solid gray"
                borderRadius="md"
                p={2}
                width="100%"
                color="black"
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
                bg="white"
                border="1px solid gray"
                borderRadius="md"
                p={2}
                width="100%"
                color="black"
              />
            </FormControl>
            {/* Puedes agregar más campos de la clase aquí según tu modelo */}
            <HStack>
              <Button type="submit" bg="verde" color="white">
                Guardar Cambios
              </Button>
              <Button bg="naranja" color="white" onClick={handleVolverClick}>
                Cancelar
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default EditarClase;
