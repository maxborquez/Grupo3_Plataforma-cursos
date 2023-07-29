import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Sidebar from "../../components/sideBarProfe";
import { crearClase } from "../../data/clasesData";

const CrearClase = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleCrearClaseClick = async () => {
    try {
      // Validar que se haya ingresado el nombre y la fecha
      if (!nombre || !fecha) {
        return;
      }

      const nuevaClase = {
        nombre: nombre,
        fecha: fecha,
      };

      await crearClase(cursoId, nuevaClase);

      // Redirigir a la página de detalles del curso después de crear la clase
      router.push(`/profesorPages/cursosProfeVer/${cursoId}`);
    } catch (error) {
      console.error("Error al crear la clase:", error);
      // Lógica para manejar errores
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box flexGrow={4} bg="black" border="1px solid #CBD5E0" borderRadius="8px" mt={4} ml={3} mr={2} mb={4} display="flex" flexDirection="column">
        <Box
          p={4}
          bg="#E2E8F0"
          border="1px solid #CBD5E0"
          borderRadius="8px"
          mt={4}
          ml={3}
          mr={3}
          mb={1}
          flexGrow={1}
        >
          <Box bg="white" p={4} borderRadius="8px" textAlign="center">
            <Heading as="h1" size="xl">
              Crear Clase
            </Heading>
          </Box>
          <FormControl mt={4} p={4}>
            <FormLabel>Nombre de la clase</FormLabel>
            <Input type="text" value={nombre} onChange={handleNombreChange} />
          </FormControl>
          <FormControl mt={4} p={4}>
            <FormLabel>Fecha de la clase</FormLabel>
            <Input type="date" value={fecha} onChange={handleFechaChange} />
          </FormControl>
          <Button colorScheme="blue" mt={4} onClick={handleCrearClaseClick}>
            Crear Clase
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CrearClase;
