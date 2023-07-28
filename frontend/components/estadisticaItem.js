// estadisticaItem.js
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { deleteEstadistica } from '../data/estadisticasData';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const EstadisticaItem = ({ estadistica, fetchData }) => {
  const router = useRouter();
  const formattedFechaCreacion = format(new Date(estadistica.fecha_creacion), 'dd/MM/yyyy HH:mm:ss');

  const handleEliminarClick = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'La estadística se borrará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteEstadistica(id);
        Swal.fire('Borrado', 'La estadística ha sido eliminada correctamente.', 'success');
        fetchData();
      } catch (error) {
        console.error('Error al eliminar la estadística:', error);
        Swal.fire('Error', 'No se pudo eliminar la estadística.', 'error');
      }
    }
  };

  return (
    <Box p={4} bg="white" borderRadius="8px" mb={2}>
      <Text fontSize="sm" color="gray.600" mb={2}>
        {formattedFechaCreacion}
      </Text>
      <HStack mt={2} justifyContent="flex-end">
        <Button colorScheme="blue" size="sm" onClick={() => onDetalleClick(estadistica._id)}>
          Detalle
        </Button>
        <Button colorScheme="red" size="sm" onClick={() => handleEliminarClick(estadistica._id)}>
          Eliminar
        </Button>
      </HStack>
    </Box>
  );
};

export default EstadisticaItem;
