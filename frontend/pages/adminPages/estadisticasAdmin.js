// estadisticasAdmin.js
import { useState, useEffect } from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { getEstadisticas, createEstadistica } from '../../data/estadisticasData';
import EstadisticaItem from '../../components/estadisticaItem';

const EstadisticasAdminPage = () => {
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const estadisticasResponse = await getEstadisticas();
      setEstadisticas(estadisticasResponse);
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  const handleDetalleClick = (estadisticaId) => {
    console.log('Detalle de la estadística:', estadisticaId);
  };

  const handleEliminarClick = async (estadisticaId) => {
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
        await deleteEstadistica(estadisticaId);
        fetchData();
        Swal.fire('Borrado', 'La estadística ha sido eliminada correctamente.', 'success');
      } catch (error) {
        console.error('Error al eliminar la estadística:', error);
        Swal.fire('Error', 'No se pudo eliminar la estadística.', 'error');
      }
    }
  };

  const handleAgregarClick = async () => {
    try {
      await createEstadistica();
      fetchData();
    } catch (error) {
      console.error('Error al crear la estadística:', error);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif" display="flex">
        <Box
          flex="1"
          p={4}
          borderRadius="10px"
          bg="gray.300"
          textAlign="left"
          display="flex"
          flexDirection="column"
        >
          <Heading as="h1" size="xl" mb={4}>
            Estadísticas generales
          </Heading>
          <Box textAlign="right" mb={4}>
            <Button
              color="white"
              backgroundColor="green.400"
              onClick={handleAgregarClick}
            >
              +
            </Button>
          </Box>
          {estadisticas.map((estadistica) => (
            <EstadisticaItem
              key={estadistica._id}
              estadistica={estadistica}
              fetchData={fetchData}
              onDetalleClick={handleDetalleClick}
              onEliminarClick={handleEliminarClick}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EstadisticasAdminPage;
