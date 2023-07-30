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
import Sidebar from "../../components/sideBarProfe";
import { borrarAviso } from "../../data/avisosData";
import { eliminarClase } from "../../data/clasesData";

const CursoProfeVer = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [curso, setCurso] = useState(null);
  const [alumnosInscritos, setAlumnosInscritos] = useState([]);

  const loadAlumnosInscritos = async () => {
    try {
      const response = await getCursoById(cursoId);
      if (response.state === "Success") {
        setAlumnosInscritos(response.data.alumnos);
      } else {
        console.error("Error al obtener los alumnos inscritos:", response);
      }
    } catch (error) {
      console.error("Error al cargar los alumnos inscritos:", error);
    }
  };

  const loadCursoDetalle = async () => {
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
      loadCursoDetalle();
      loadAlumnosInscritos();
    }
  }, [cursoId]);

  if (!curso) {
    return <div>Cargando...</div>;
  }

  const handleVolverClick = () => {
    router.back();
  };

  const handleCrearClasesClick = () => {
    router.push(`/profesorPages/crearClase/${cursoId}`);
  };

  const handleEditarClaseClick = (claseId) => {
    router.push(`/profesorPages/editarClase/${claseId}`);
  };

  const handleCrearAvisoClick = () => {
    router.push(`/profesorPages/crearAviso/${cursoId}`);
  };

  const handleEditarAvisoClick = (avisoId) => {
    router.push(`/profesorPages/editarAviso/${avisoId}`);
  };

  const handleBorrarAvisoClick = async (avisoId) => {
    try {
      await borrarAviso(avisoId);
      loadCursoDetalle(); // Recargamos los detalles del curso para reflejar los cambios
    } catch (error) {
      console.error("Error al borrar el aviso:", error);
    }
  };

  const handleBorrarClaseClick = async (claseId) => {
    try {
      await eliminarClase(claseId, cursoId);
      loadCursoDetalle(); // Recargamos los detalles del curso para reflejar los cambios
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };

  const handleCalificacionesClick = () => {
    router.push(`/profesorPages/calificacionesAlumnos/${cursoId}`);
  };

  const handleMarcarAsistenciaClick = (claseId) => {
    // Realizar la redirección a la página "MarcarAsistencia" con cursoId y claseId en la URL
    router.push(`/profesorPages/marcarAsistencia/${cursoId}/${claseId}`);
  };

  return (
    <Box display="flex" minHeight="100vh" bg="negro">
      <Sidebar />

      <Box
        flexGrow={4}
        bg="negro-sec"
        border="1px solid #CBD5E0"
        borderRadius="8px"
        mt={4}
        ml={3}
        mr={2}
        mb={4}
        display="flex"
        flexDirection="column"
      >
        <Box
          p={4}
          bg="negro-sec"
          border="1px solid #CBD5E0"
          borderRadius="8px"
          mt={4}
          ml={3}
          mr={3}
          mb={1}
          flexGrow={1}
        >
          <Box bg="negro-sec" p={4} borderRadius="8px" textAlign="center">
            <Heading as="h1" size="xl">
              {curso.nombre}
            </Heading>
          </Box>
          <Divider />
          <VStack
            mt={4}
            spacing={4}
            bg="amarillo"
            color="cafe"
            p={4}
            borderRadius="8px"
          >
            <Box w="100%">
              <Heading as="h3" size="lg">
                Información del curso
              </Heading>
              <VStack align="flex-start" mt={2} spacing={4}>
                <Text>
                  <strong>Estado:</strong>{" "}
                  <Badge
                    colorScheme={
                      curso.estado === "Disponible" ? "green" : "red"
                    }
                  >
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
                  <strong>Profesor:</strong> {curso.profesor?.nombre}{" "}
                  {curso.profesor?.apellido}
                </Text>
                <Button bg="azul" color="blanco" onClick={handleCalificacionesClick}>
                  Calificaciones
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Box
          p={4}
          bg="negro-sec"
          border="1px solid #CBD5E0"
          borderRadius="8px"
          mt={2}
          ml={3}
          mr={3}
          mb={4}
          flexGrow={1}
        >
          <Box
            bg="negro-sec"
            p={4}
            borderRadius="8px"
            textAlign="center"
            display="1"
          >
            <Heading as="h1" size="xl">
              Clases
              <Button
                ml="4"
                bg="verde"
                color="blanco"
                size="sm"
                onClick={() => handleCrearClasesClick()}
              >
                +
              </Button>
            </Heading>
          </Box>
          <Box
            p={2}
            bg="amarillo"
            border="1px solid #CBD5E0"
            borderRadius="8px"
            mt={1}
            ml={1}
            mr={1}
            mb={1}
            flexGrow={1}
            maxHeight="200px"
            overflowY="auto"
          >
            <VStack
              mt={2}
              spacing={4}
              bg="amarillo"
              color="black"
              p={4}
              borderRadius="8px"
            >
              {curso.clases.length > 0 ? (
                <UnorderedList>
                  {curso.clases.map((clase) => (
                    <ListItem key={clase._id}>
                      Nombre: {clase.nombre} - Fecha:{" "}
                      {new Date(clase.fecha).toLocaleDateString()}
                      <Button
                        ml="4"
                        size="xs"
                        bg="naranja"
                        color="white"
                        onClick={() => handleBorrarClaseClick(clase._id)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        ml="4"
                        size="xs"
                        bg="cafe"
                        color="white"
                        onClick={() => handleEditarClaseClick(clase._id)}
                      >
                        Editar
                      </Button>
                      {/* Botón para marcar asistencia */}
                      <Button
                        ml="4"
                        size="xs"
                        bg="verde"
                        color="blanco"
                        onClick={() => handleMarcarAsistenciaClick(clase._id)}
                      >
                        Marcar Asistencia
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

      <Box p={3} mt="8" bg="negro-sec" border="1px solid #CBD5E0" borderRadius="8px" ml={3} mr={3} mb={4} flexGrow={1} display="flex" flexDirection="column">
        <Box p={2} bg="negro-sec" border="1px solid #CBD5E0" borderRadius="8px" mt={4} ml={1} mr={4} mb={4} flexGrow={1}>
          <Box mt={2} ml={1} mr={1} flexGrow={1}>
            <Heading as="h3" size="lg" textAlign="center">
              Avisos
              <Button
                ml="4"
                bg="verde"
                color="blanco"
                size="sm"
                onClick={() => handleCrearAvisoClick()}
              >
                +
              </Button>
            </Heading>
            <Box w="100%" mt={4} p={4} bg="amarillo" color="cafe" border="1px solid #CBD5E0" borderRadius="8px" overflowY="auto">
              {curso.avisos.length > 0 ? (
                <UnorderedList>
                  {curso.avisos.map((aviso) => (
                    <ListItem key={aviso._id}>
                      {aviso.contenido}
                      <Button
                        ml="4"
                        size="xs"
                        bg="naranja"
                        color="white"
                        onClick={() => handleBorrarAvisoClick(aviso._id)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        ml="4"
                        size="xs"
                        bg="cafe"
                        color="white"
                        onClick={() => handleEditarAvisoClick(aviso._id)}
                      >
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

        <Box p={4} mt="8" bg="negro-sec" border="1px solid #CBD5E0" borderRadius="8px" ml={3} mr={3} mb={4} flexGrow={1} overflowY="auto">
          <Heading as="h3" size="lg" textAlign="center">
            Alumnos Inscritos
          </Heading>
          <VStack mt={2} spacing={4} bg="amarillo" color="negro-sec" p={4} borderRadius="8px" >
            {alumnosInscritos.length > 0 ? (
              <UnorderedList>
                {alumnosInscritos.map((alumno) => (
                  <ListItem key={alumno._id}>
                    {alumno.alumno.nombre} {alumno.alumno.apellido} - Estado: {alumno.estado}
                  </ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text fontStyle="italic">Aún no hay alumnos inscritos en el curso.</Text>
            )}
          </VStack>
        </Box>
      </Box>

      {/* Agregar el botón Volver en la esquina inferior derecha */}
      <Box position="fixed" bottom="10px" right="10px">
        <Button bg="cafe" color="white" onClick={handleVolverClick}>
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default CursoProfeVer;
