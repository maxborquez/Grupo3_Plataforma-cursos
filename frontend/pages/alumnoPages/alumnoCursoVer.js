import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  ListItem,
  UnorderedList,
  Badge,
} from "@chakra-ui/react";
import { inscribirAlumnoEnCurso, getCursoById } from "../../data/cursosData";
import { getUserId } from "../../data/auth";
import Sidebar from "../../components/sideBarAlumno";

const CursoAlumnoVer = () => {
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

  const handleCalificacionesVerClick = () => {
    router.push(`/profesorPages/calificacionesVer/${cursoId}`);
  };

  const handleInscribirClick = async () => {
    try {
      const alumnoId = getUserId(); // Obtener el ID del alumno desde el token
      if (!alumnoId) {
        console.error("Error al obtener el ID del alumno desde el token.");
        return;
      }

      console.log("cursoId:", cursoId);
      console.log("alumnoId:", alumnoId);

      // Llamar a la función inscribirAlumnoEnCurso con los IDs del curso y el alumno
      const response = await inscribirAlumnoEnCurso(cursoId, alumnoId);
      console.log("Respuesta de inscripción:", response);
      // Aquí puedes mostrar un mensaje de éxito o realizar otras acciones después de la inscripción
    } catch (error) {
      console.error("Error al inscribir alumno en el curso:", error);
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones en caso de error
    }
  };

  return (
    <Box color="naranja" display="flex" minHeight="100vh" bg="negro">
      <Sidebar />

      <VStack
        flexGrow={1}
        bg="negro-sec"
        border="1px solid #CBD5E0"
        borderRadius="8px"
        mt={4}
        ml={3}
        mr={2}
        mb={4}
        p={4}
        align="stretch"
        spacing={4}
      >
        <Heading as="h1" size="xl" textAlign="center">
          {curso.nombre}
        </Heading>
        <Text textAlign="center" fontWeight="bold">
          Estado:{" "}
          <Badge colorScheme={curso.estado === "Disponible" ? "green" : "red"}>
            {curso.estado}
          </Badge>
        </Text>
        <Text textAlign="center" fontWeight="bold">
          Fecha de inicio: {new Date(curso.fecha_inicio).toLocaleDateString()}
        </Text>
        <Text textAlign="center" fontWeight="bold">
          Fecha de fin: {new Date(curso.fecha_fin).toLocaleDateString()}
        </Text>
        <Text textAlign="center" fontWeight="bold">
          Profesor: {curso.profesor?.nombre} {curso.profesor?.apellido}
        </Text>
        <Button
          bg="cafe"
          color="blanco"
          onClick={handleCalificacionesVerClick}
        >
          Calificaciones
        </Button>
        <Box
          bg="amarillo"
          color="cafe"
          borderRadius={8}
          mt={2}
          ml={1}
          mr={4}
          mb={4}
        >
          <Heading as="h3" size="lg" textAlign="center">
            Clases
          </Heading>
          <UnorderedList>
            {curso.clases.length > 0 ? (
              curso.clases.map((clase) => (
                <ListItem key={clase._id}>
                  Nombre: {clase.nombre} - Fecha:{" "}
                  {new Date(clase.fecha).toLocaleDateString()}
                </ListItem>
              ))
            ) : (
              <Text fontStyle="italic">Aún no hay clases disponibles.</Text>
            )}
          </UnorderedList>
        </Box>
        <Box flexGrow={1} />

        <Box
          p={2}
          bg="amarillo"
          color="cafe"
          border="1px solid #CBD5E0"
          borderRadius="8px"
          mt={2}
          ml={1}
          mr={4}
          mb={4}
          flexGrow={1}
        >
          <Heading as="h3" size="lg" textAlign="center">
            Alumnos Inscritos
          </Heading>
          <UnorderedList mt={2}>
            {alumnosInscritos.length > 0 ? (
              alumnosInscritos.map((alumno) => (
                <ListItem key={alumno._id}>
                  {alumno.alumno.nombre} {alumno.alumno.apellido} - Estado:{" "}
                  {alumno.estado}
                </ListItem>
              ))
            ) : (
              <Text fontStyle="italic">
                Aún no hay alumnos inscritos en el curso.
              </Text>
            )}
          </UnorderedList>
        </Box>

        <Box
          p={2}
          bg="amarillo"
          color="cafe"
          border="1px solid #CBD5E0"
          borderRadius="8px"
          mt={2}
          ml={1}
          mr={4}
          mb={4}
          flexGrow={1}
        >
          <Heading as="h3" size="lg" textAlign="center">
            Avisos
          </Heading>
          <UnorderedList mt={2}>
            {curso.avisos.length > 0 ? (
              curso.avisos.map((aviso) => (
                <ListItem key={aviso._id}>{aviso.contenido}</ListItem>
              ))
            ) : (
              <Text fontStyle="italic">Aún no hay avisos disponibles.</Text>
            )}
          </UnorderedList>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button bg="cafe" color="white" onClick={handleVolverClick}>
            Volver
          </Button>
          <Button bg="cafe" color="blanco" onClick={handleInscribirClick}>
            Inscribir
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default CursoAlumnoVer;
