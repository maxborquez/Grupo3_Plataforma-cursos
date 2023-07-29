import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAvisoPorId, actualizarAviso } from '../../data/avisosData';
import { Box, Heading, Textarea, Button } from '@chakra-ui/react';

const EditarAviso = () => {
  const router = useRouter();
  const { avisoId } = router.query;

  const [aviso, setAviso] = useState({});

  useEffect(() => {
    if (avisoId) {
      obtenerAviso();
    }
  }, [avisoId]);

  const obtenerAviso = async () => {
    try {
      const avisoObtenido = await getAvisoPorId(avisoId);
      setAviso(avisoObtenido);
    } catch (error) {
      console.error('Error al obtener el aviso:', error);
    }
  };

  const handleChange = (e) => {
    setAviso({
      ...aviso,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarAviso(avisoId, aviso);
      router.back();
    } catch (error) {
      console.error('Error al editar el aviso:', error);
    }
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <Box p={2} maxWidth="600px" margin="0 auto" bg="amarillo" border="1px solid gray" borderRadius="md" marginTop="20px">
      <Box p={4} bg="negro-sec" borderRadius="8px">
        <Heading as="h1" size="xl" mb={4}>
          Editar Aviso
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <label htmlFor="contenido">Contenido del Aviso:</label>
            <Textarea
              name="contenido"
              id="contenido"
              value={aviso.contenido || ''}
              onChange={handleChange}
              size="md"
              resize="vertical"
            />
          </Box>
          <Button type="submit" bg="verde" color="white" mr={2}>
            Guardar Cambios
          </Button>
          <Button bg="naranja" color="white" onClick={handleVolverClick}>Cancelar</Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditarAviso;
