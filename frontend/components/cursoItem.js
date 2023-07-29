// components/CursoItem.js
import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';

const CursoItem = ({ curso, onDetalleClick, onBorrarClick }) => {
  return (
    <Box p={4} bg="amarillo" borderRadius="8px" mb={2}>
      <Heading as="h3" size="md" color="cafe">
        {curso.nombre}
      </Heading>
      <Text fontSize="sm" color="cafe">
        {curso.descripcion}
      </Text>
      <HStack mt={2} justifyContent="flex-end">
        <Button bg="cafe" color="blanco" size="sm" onClick={() => onDetalleClick(curso._id)}>
          Detalle
        </Button>
        <Button colorScheme="red" size="sm" onClick={() => onBorrarClick(curso._id)}>
          Borrar
        </Button>
      </HStack>
    </Box>
  );
};

export default CursoItem;
