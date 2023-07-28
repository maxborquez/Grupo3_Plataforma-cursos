import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { deleteEstadistica } from '../data/estadisticasData';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const EstadisticaItem = ({ estadistica, fetchData }) => {
  const router = useRouter();
  const formattedFechaCreacion = format(new Date(estadistica.fecha_creacion), 'dd/MM/yyyy HH:mm:ss');

  // Función para eliminar la estadística por su ID
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
        fetchData(); // Llamar a la función fetchData para actualizar la lista de estadísticas
        Swal.fire('Borrado', 'La estadística ha sido eliminada correctamente.', 'success');
      } catch (error) {
        console.error('Error al eliminar la estadística:', error);
        Swal.fire('Error', 'No se pudo eliminar la estadística.', 'error');
      }
    }
  };

  // Función para manejar el clic en el botón Detalle
  const handleDetalleClick = (estadisticaId) => {
    // Redirigir a la página de detalle de la estadística
    router.push(`/adminPages/estadisticaDetalle/${estadisticaId}`);
  };

  return (
    <Box p={4} bg="white" borderRadius="8px" mb={2}>
      <Text fontSize="sm" color="gray.600" mb={2}>
        {formattedFechaCreacion}
      </Text>
      <HStack mt={2} justifyContent="flex-end">
        <Button colorScheme="blue" size="sm" onClick={() => handleDetalleClick(estadistica._id)}>
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
