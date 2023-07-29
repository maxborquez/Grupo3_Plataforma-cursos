import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { crearClase } from "../../data/clasesData";

const CrearClase = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [mostrarAviso, setMostrarAviso] = useState(false);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleCrearClaseClick = async () => {
    if (!nombre || !fecha) {
      // Si alguno de los campos está vacío, mostrar el aviso
      setMostrarAviso(true);
      return;
    }

    try {
      const nuevaClase = {
        nombre: nombre,
        fecha: fecha,
      };

      await crearClase(cursoId, nuevaClase);

      // Redirigir a la página de detalles del curso después de crear la clase
      router.back();
    } catch (error) {
      console.error("Error al crear la clase:", error);
      // Lógica para manejar errores
    }
  };

  return (
    <Box p={2} maxWidth="600px" margin="0 auto" bg="amarillo" border="1px solid gray" borderRadius="md" marginTop="20px">
      <Box p={4} bg="negro-sec" borderRadius="8px">
        <Heading as="h1" size="xl" textAlign="center" mb={4} color="blanco">
          Crear Clase
        </Heading>
        <form>
          <FormControl>
            <FormLabel color="blanco">Nombre de la clase:</FormLabel>
            <Input type="text" value={nombre} onChange={handleNombreChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color="blanco">Fecha de la clase:</FormLabel>
            <Input type="date" value={fecha} onChange={handleFechaChange} />
          </FormControl>
          {mostrarAviso && (
            <Box color="red" fontSize="sm" mt={2} textAlign="center">
              Por favor, rellena todos los campos.
            </Box>
          )}
          <Box display="flex" justifyContent="center">
            <Button bg="verde" color="blanco" mt={4} onClick={handleCrearClaseClick}>
              Crear Clase
            </Button>
            <Button bg="naranja" color="blanco"mt={4} ml={2} onClick={() => router.back()}>
              Volver
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CrearClase;
