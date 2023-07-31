import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerCalificacionPorId, updateCalificacion } from "../../data/calificacionesData";
import { Box, Heading, FormControl, FormLabel, Textarea, Button } from "@chakra-ui/react";

const CalificacionesEditar = () => {
  const router = useRouter();
  const { calificacionId } = router.query;
  const [calificacion, setCalificacion] = useState(null);

  useEffect(() => {
    if (calificacionId) {
      obtenerCalificacion();
    }
  }, [calificacionId]);

  const obtenerCalificacion = async () => {
    try {
      const calificacionData = await obtenerCalificacionPorId(calificacionId);
      setCalificacion(calificacionData);
    } catch (error) {
      console.error("Error al obtener la calificación:", error);
    }
  };

  const handleChange = (e) => {
    setCalificacion({
      ...calificacion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCalificacion(
        calificacionId,
        calificacion.nombreCalificacion,
        calificacion.calificacion
      );
      router.back(); // Redirigir a la página de vista de calificaciones después de guardar cambios
    } catch (error) {
      console.error("Error al actualizar la calificación:", error);
    }
  };

  if (!calificacion) {
    return (
      <Box p={4} textAlign="center">
        <Heading as="h1" size="xl" mb={4} color="white">
          Editando Calificación
        </Heading>
        {/* Agregar el Spinner o mensaje de carga aquí */}
      </Box>
    );
  }

  return (
    <Box p={4} maxWidth="600px" mx="auto" bg="yellow.100" border="1px solid gray" borderRadius="md" my="20px">
      <Box p={4} bg="blackAlpha.800" borderRadius="8px">
        <Heading as="h1" size="xl" mb={4} color="white">
          Editar Calificación
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <FormLabel htmlFor="nombreCalificacion" color="white">
              Nombre de la calificación
            </FormLabel>
            <Textarea
              name="nombreCalificacion"
              id="nombreCalificacion"
              value={calificacion.nombre || ''} // Mostrar el atributo "nombre" de la calificación
              onChange={handleChange}
              size="md"
              resize="vertical"
              bg="white"
              color="black"
              borderRadius="md"
            />
          </Box>
          <Box mb={4}>
            <FormLabel htmlFor="calificacion" color="white">
              Calificación
            </FormLabel>
            <Textarea
              name="calificacion"
              id="calificacion"
              value={calificacion.calificacion}
              onChange={handleChange}
              size="md"
              resize="vertical"
              bg="white"
              color="black"
              borderRadius="md"
            />
          </Box>
          <Button colorScheme="green" type="submit" mr={2}>
            Guardar Cambios
          </Button>
          <Button colorScheme="orange" onClick={() => router.back()}>
            Cancelar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CalificacionesEditar;
