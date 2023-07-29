import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Divider,
  ListItem,
  UnorderedList,
  Badge,
} from "@chakra-ui/react";
import { getCursoById } from "../../data/cursosData";
import Sidebar from "../../components/sideBar";
import { borrarAviso } from "../../data/avisosData";
import { eliminarClase } from "../../data/clasesData";

const CursoDetalle = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [curso, setCurso] = useState(null);

  const loadCurso = async () => {
    try {
      const response = await getCursoById(cursoId);
      if (response.state === "Success") {
        setCurso(response.data);
      } else {
        console.error("Error al obtener los detalles del curso:", response);
      }
    } catch (error) {
      console.error("Error al cargar los detalles del curso:", error);
    }
  };

  useEffect(() => {
    if (cursoId) {
      loadCurso();
    }
  }, [cursoId]);

  if (!curso) {
    return <div>Cargando...</div>;
  }

  const handleVolverClick = () => {
    router.back();
  };

  const handleCrearClasesClick = (cursoId) => {
    router.push(`/profesorPages/crearClase/${cursoId}`);
  };

  const handleEditarClaseClick = (claseId) => {
    router.push(`/profesorPages/editarClase/${claseId}`);
  };

  const handleCrearAvisoClick = (cursoId) => {
    router.push(`/profesorPages/crearAviso/${cursoId}`);
  };

  const handleEditarAvisoClick = (avisoId) => {
    router.push(`/profesorPages/editarAviso/${avisoId}`);
  };

  const handleBorrarAvisoClick = async (avisoId) => {
    try {
      await borrarAviso(avisoId);
      loadCurso(); // Recargamos los detalles del curso para reflejar los cambios
    } catch (error) {
      console.error('Error al borrar el aviso:', error);
    }
  };

  const handleBorrarClaseClick = async (claseId) => {
    try {
      await eliminarClase(claseId, cursoId);
      loadCurso(); // Recargamos los detalles del curso para reflejar los cambios
    } catch (error) {
      console.error('Error al eliminar la clase:', error);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box flexGrow={4} bg="black" border="1px solid #CBD5E0" borderRadius="8px" mt={4} ml={3} mr={2} mb={4} display="flex" flexDirection="column">
        <Box p={4} bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" mt={4} ml={3} mr={3} mb={1} flexGrow={1}>
          <Box bg="white" p={4} borderRadius="8px" textAlign="center">
            <Heading as="h1" size="xl">
              {curso.nombre}
            </Heading>
          </Box>
          <Divider />
          <VStack mt={4} spacing={4} bg="white" color="black" p={4} borderRadius="8px">
            <Box w="100%">
              <Heading as="h3" size="lg">
                Información del curso
              </Heading>
              <VStack align="flex-start" mt={2} spacing={4}>
                <Text>
                  <strong>Estado:</strong>{" "}
                  <Badge colorScheme={curso.estado === "Disponible" ? "green" : "red"}>
                    {curso.estado}
                  </Badge>
                </Text>
                <Text>
                  <strong>Fecha de inicio:</strong>{" "}
                  {new Date(curso.fecha_inicio).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Fecha de fin:</strong>{" "}
                  {new Date(curso.fecha_fin).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Profesor:</strong> {curso.profesor?.nombre} {curso.profesor?.apellido}
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Box p={4} bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" mt={2} ml={3} mr={3} mb={4} flexGrow={1}>
          <Box bg="white" p={4} borderRadius="8px" textAlign="center">
            <Heading as="h1" size="xl">
              Clases
              <Button ml="auto" colorScheme="blue" size="sm" onClick={() => handleCrearClasesClick(cursoId)}>
                +
              </Button>
            </Heading>
          </Box>
          <Box p={2} bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" mt={1} ml={1} mr={1} mb={1} flexGrow={1} maxHeight="200px" overflowY="auto">
            <VStack mt={2} spacing={4} bg="white" color="black" p={4} borderRadius="8px">
              {curso.clases.length > 0 ? (
                <UnorderedList>
                  {curso.clases.map((clase) => (
                    <ListItem key={clase._id}>
                      Nombre: {clase.nombre} - Fecha: {new Date(clase.fecha).toLocaleDateString()}
                      <Button ml="auto" size="sm" colorScheme="red" onClick={() => handleBorrarClaseClick(clase._id)}>
                        Eliminar
                      </Button>
                      <Button ml="auto" size="sm" colorScheme="green" onClick={() => handleEditarClaseClick(clase._id)}>
                        Editar
                      </Button>
                    </ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <Text fontStyle="italic">Aún no hay clases disponibles.</Text>
              )}
            </VStack>
          </Box>
        </Box>
      </Box>

      <Box p={2} bg="black" border="1px solid #CBD5E0" borderRadius="8px" mt={4} ml={1} mr={4} mb={4} flexGrow={1}>
        <Box mt={2} ml={1} mr={1} flexGrow={1}>
          <Box w="100%" p={4} bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px">
            <Heading as="h3" size="lg" textAlign="center">
              Avisos
              <Button ml="auto" colorScheme="blue" size="sm" onClick={() => handleCrearAvisoClick(cursoId)}>
                +
              </Button>
            </Heading>
            <Divider />
            {curso.avisos.length > 0 ? (
              <UnorderedList>
                {curso.avisos.map((aviso) => (
                  <ListItem key={aviso._id}>
                    {aviso.contenido}
                    <Button ml="auto" size="sm" colorScheme="red" onClick={() => handleBorrarAvisoClick(aviso._id)}>
                      Borrar
                    </Button>
                    <Button ml="auto" size="sm" colorScheme="green" onClick={() => handleEditarAvisoClick(aviso._id)}>
                      Editar
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text fontStyle="italic">Aún no hay avisos disponibles.</Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CursoDetalle;
