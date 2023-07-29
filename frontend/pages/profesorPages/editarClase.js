import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack } from "@chakra-ui/react";
import { obtenerClasePorId, actualizarClase } from "../../data/clasesData";

const EditarClase = () => {
  const router = useRouter();
  const { claseId } = router.query;
  const [clase, setClase] = useState(null);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");

  // Cargar la clase al cargar la página
  useEffect(() => {
    if (claseId) {
      loadClase();
    }
  }, [claseId]);

  // Función para cargar la clase desde el servidor
  const loadClase = async () => {
    try {
      const response = await obtenerClasePorId(claseId);
      if (response.state === "Success") {
        setClase(response.data);
        setNombre(response.data.nombre);
        setFecha(response.data.fecha);
      } else {
        console.error("Error al obtener la clase:", response);
      }
    } catch (error) {
      console.error("Error al cargar la clase:", error);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realizar la actualización de la clase
      const updatedClase = {
        nombre: nombre,
        fecha: fecha,
      };
      const response = await actualizarClase(claseId, updatedClase);
      if (response.state === "Success") {
        // Regresar a la página anterior (detalles del curso)
        router.back();
      } else {
        console.error("Error al actualizar la clase:", response);
      }
    } catch (error) {
      console.error("Error al actualizar la clase:", error);
    }
  };
  
  if (!clase) {
    return <div>Cargando...</div>;
  }

  return (
    <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
      <Heading as="h1" size="lg" mb={4}>
        Editar Clase
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack align="start" spacing={4}>
          <FormControl>
            <FormLabel>Nombre de la clase</FormLabel>
            <Input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de la clase</FormLabel>
            <Input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Guardar cambios
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditarClase;
