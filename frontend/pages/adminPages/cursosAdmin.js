import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/sideBar';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getCursos, deleteCurso } from '../../data/cursosData';
import withAuth from '../../data/withAuth';
import CursoItem from '../../components/cursoItem';
import { useRouter } from 'next/router';

const CursosAdminPage = () => {
  const router = useRouter();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    try {
      const cursosData = await getCursos();
      setCursos(cursosData.data);
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
    }
  };

  const verDetalleCurso = (id) => {
    router.push(`/adminPages/cursoDetalle/${id}`);
  };

  const navigateToCursoCreate = () => {
    router.push('/adminPages/cursoCreate');
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif">
        <Box bg="negro-sec" border="1px solid amarillo" borderRadius="8px" p={4} mb={4}>
          <Heading as="h1" size="xl" color="blanco">
            Visualización de todos los cursos
          </Heading>
        </Box>

        <Box flex="2" bg="negro-sec" border="1px solid naranja" borderRadius="8px" p={4}>
          <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <Heading as="h1" size="md" color="blanco">
              Lista de cursos en sistema
            </Heading>
            <Button bg="verde" color="blanco" onClick={navigateToCursoCreate}>
              +
            </Button>
          </Flex>
          <Box overflowY="auto" maxHeight="calc(100vh - 230px)">
            {cursos.map((curso) => (
              <CursoItem
                key={curso._id}
                curso={curso}
                onDetalleClick={() => verDetalleCurso(curso._id)}
                onBorrarClick={(id) => {
                  Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Esta acción eliminará el curso de forma permanente.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, borrar',
                    cancelButtonText: 'No, cancelar',
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        await deleteCurso(id);
                        loadCursos();
                        Swal.fire('¡Borrado!', 'El curso ha sido eliminado correctamente.', 'success');
                      } catch (error) {
                        Swal.fire('Error', 'Hubo un problema al eliminar el curso.', 'error');
                        console.error('Error al borrar el curso:', error);
                      }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire('Cancelado', 'El curso no ha sido eliminado.', 'info');
                    }
                  });
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(CursosAdminPage, 'admin');
