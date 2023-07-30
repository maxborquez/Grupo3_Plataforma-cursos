import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { crearCalificacion } from "../../data/calificacionesData";
import { getUserId } from "../../data/auth";

const CrearCalificacion = () => {
  const router = useRouter();
  const { cursoId, alumnoId } = router.query;
  const [calificacion, setCalificacion] = useState("");

  const handleGuardarCalificacion = async () => {
    try {
      const profesorId = getUserId();

      if (!profesorId) {
        console.error("Error: No se pudo obtener el profesorId");
        return;
      }

      await crearCalificacion(cursoId, alumnoId, profesorId, calificacion);
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
      <FormControl mb={4}>
        <FormLabel>Calificación:</FormLabel>
        <Select
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          <option value="Bien">Bien</option>
          <option value="Medio">Medio</option>
          <option value="Mal">Mal</option>
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
