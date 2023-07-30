import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { crearCalificacion } from "../../data/calificacionesData";

const CrearCalificacion = () => {
  const router = useRouter();
  const { cursoId, alumnoId } = router.query;
  const [calificacion, setCalificacion] = useState("");

  const handleGuardarCalificacion = async () => {
    try {
      await crearCalificacion(cursoId, alumnoId, calificacion);
      router.back(); // Regresar a la página anterior después de guardar la calificación
    } catch (error) {
      console.error("Error al crear la calificación:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Crear Calificación
      </Heading>
      <Text mb={4}>
        <strong>Alumno:</strong> Nombre del alumno (obtén el nombre del alumno del API si lo deseas)
      </Text>
      <FormControl mb={4}>
        <FormLabel>Calificación:</FormLabel>
        <Select
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          <option value="bien">Bien</option>
          <option value="medio">Medio</option>
          <option value="mal">Mal</option>
        </Select>
      </FormControl>
      <Button
        colorScheme="blue"
        onClick={handleGuardarCalificacion}
        disabled={!calificacion}
      >
        Guardar Calificación
      </Button>
    </Box>
  );
};

export default CrearCalificacion;
