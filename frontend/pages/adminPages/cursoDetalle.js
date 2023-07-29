import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Divider,
  UnorderedList,
  Badge,
} from "@chakra-ui/react";
import { getCursoById } from "../../data/cursosData";
import Sidebar from "../../components/sideBar";
import { borrarAviso } from "../../data/avisosData";
import { eliminarClase } from "../../data/clasesData";
import ClaseItem from "../../components/clasesItem";
import AvisoItem from "../../components/avisosItem";

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

  const handleEditarCursoClick = async (cursoId) => {
    router.push(`/adminPages/cursoEditar/${cursoId}`);
  };

  const handleBorrarAvisoClick = async (avisoId) => {
    try {
      await borrarAviso(avisoId);
      loadCurso(); // Recargamos los detalles del curso para reflejar los cambios
    } catch (error) {
      console.error("Error al borrar el aviso:", error);
    }
  };

  const handleBorrarClaseClick = async (claseId) => {
    try {
      await eliminarClase(claseId, cursoId);
      loadCurso(); // Recargamos los detalles del curso para reflejar los cambios
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box flexGrow={4} bg="transparent" border="none" borderRadius="8px" mt={4} ml={3} mr={2} mb={4} display="flex" flexDirection="column">
        <Box p={4} bg="negro-sec" border="1px solid #CBD5E0" borderRadius="8px" mt={4} ml={3} mr={3} mb={1} flexGrow={1}>
          <Box bg="transparent" p={4} textAlign="center">
            <Heading as="h1" size="xl">
              {curso.nombre}
              <Button ml="10" bg="cafe" color="blanco" size="sm" onClick={() => handleEditarCursoClick(cursoId)}>
                Editar curso
              </Button>
            </Heading>
          </Box>
          <Divider />
          <VStack mt={4} spacing={4} bg="amarillo" color="cafe" p={4} borderRadius="8px">
            <Box w="100%">
              <Heading as="h3" size="lg">
                Información del curso
              </Heading>
              <VStack align="flex-start" mt={2} spacing={4}>
                <Text>
                  <strong>Estado:</strong>{" "}
                  <Badge colorScheme={curso.estado === "Disponible" ? "green" : "red"}>{curso.estado}</Badge>
                </Text>
                <Text>
                  <strong>Fecha de inicio:</strong> {new Date(curso.fecha_inicio).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Fecha de fin:</strong> {new Date(curso.fecha_fin).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Profesor:</strong> {curso.profesor?.nombre} {curso.profesor?.apellido}
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Box p={4} bg="negro-sec" border="1px solid #CBD5E0" borderRadius="8px" mt={2} ml={3} mr={3} mb={4} flexGrow={1}>
          <Box bg="transparent" p={4} borderRadius="8px" textAlign="center">
            <Heading as="h1" size="xl">
              Clases
              <Button ml="10" bg="verde" color="blanco" size="sm" onClick={() => handleCrearClasesClick(cursoId)}>
                +
              </Button>
            </Heading>
          </Box>
          <Box p={2} bg="amarillo" border="1px solid #CBD5E0" borderRadius="8px" mt={1} ml={1} mr={1} mb={1} flexGrow={1} maxHeight="200px" overflowY="auto">
            <VStack mt={2} bg="amarillo" color="cafe" p={4} borderRadius="8px">
              {curso.clases.length > 0 ? (
                <UnorderedList>
                  {curso.clases.map((clase) => (
                    <ClaseItem key={clase._id} clase={clase} onEditarClick={handleEditarClaseClick} onBorrarClick={handleBorrarClaseClick} />
                  ))}
                </UnorderedList>
              ) : (
                <Text fontStyle="italic">Aún no hay clases disponibles.</Text>
              )}
            </VStack>
          </Box>
        </Box>
      </Box>

      <Box p={2} bg="transparent" border="none" borderRadius="8px" mt={4} ml={1} mr={4} mb={4} flexGrow={1}>
        <Box mt={2} ml={1} mr={1} flexGrow={1}>
          <Box w="100%" p={4} bg="negro-sec" border="1px solid #CBD5E0" borderRadius="8px">
            <Box>
              <Heading as="h3" size="lg" textAlign="center">
                Avisos
                <Button ml="10" bg="verde" color="blanco" size="sm" onClick={() => handleCrearAvisoClick(cursoId)}>
                  +
                </Button>
              </Heading>
            </Box>
            <br/>
            <Box bg="amarillo" color="cafe">
              <Divider />
              {curso.avisos.length > 0 ? (
                <UnorderedList>
                  {curso.avisos.map((aviso) => (
                    <AvisoItem key={aviso._id} aviso={aviso} onEditarClick={handleEditarAvisoClick} onBorrarClick={handleBorrarAvisoClick} />
                  ))}
                </UnorderedList>
              ) : (
                <Text fontStyle="italic">Aún no hay avisos disponibles.</Text>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CursoDetalle;
