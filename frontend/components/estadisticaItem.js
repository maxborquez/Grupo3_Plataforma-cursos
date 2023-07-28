import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { format } from 'date-fns'; // Importar la función format

const EstadisticaItem = ({ estadistica, onDetalleClick, onEliminarClick }) => {
  const formattedFechaCreacion = format(new Date(estadistica.fecha_creacion), 'dd/MM/yyyy HH:mm:ss'); // Formatear la fecha de creación

  return (
    <Box p={4} bg="white" borderRadius="8px" mb={2}>
      <Text fontSize="sm" color="gray.600" mb={2}>
        Fecha de creación: {formattedFechaCreacion}
      </Text>
      <HStack mt={2} justifyContent="flex-end">
        <Button colorScheme="blue" size="sm" onClick={() => onDetalleClick(estadistica._id)}>
          Detalle
        </Button>
        <Button colorScheme="red" size="sm" onClick={() => onEliminarClick(estadistica._id)}>
          Eliminar
        </Button>
      </HStack>
    </Box>
  );
};

export default EstadisticaItem;
