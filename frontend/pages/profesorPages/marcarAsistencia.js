// profesorPages/marcarAsistencia.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
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
import { marcarAsistencia } from "../../data/asistenciaData";

const MarcarAsistencia = () => {
  const router = useRouter();
  const { cursoId, claseId } = router.query;
  const [curso, setCurso] = useState(null);
  const [alumnosInscritos, setAlumnosInscritos] = useState([]);

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
    }
  }, [cursoId]);

  const handleMarcarAsistenciaClick = async (alumnoId, presente) => {
    try {
      await marcarAsistencia(alumnoId, cursoId, claseId, presente);
      loadCursoDetalle(); // Recargamos los datos del curso para reflejar los cambios en la asistencia
    } catch (error) {
      console.error("Error al marcar la asistencia:", error);
    }
  };

  if (!curso) {
    return <div>Cargando...</div>;
  }

  return (
    <Box display="flex" minHeight="100vh" bg="negro">
      <Box p={4} flexGrow={1} bg="negro-sec">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Lista de Alumnos Inscritos
        </Heading>
        {curso.alumnos.length > 0 ? (
          <VStack spacing={4} align="flex-start">
            {curso.alumnos.map((alumno) => (
              <Box key={alumno._id} p={2} borderRadius="8px" bg="amarillo" w="100%">
                <Text>
                  <strong>Nombre:</strong> {alumno.nombre} {alumno.apellido}
                </Text>
                <Text>
                  <strong>Estado:</strong>{" "}
                  {alumno.asistencias && alumno.asistencias[claseId]
                    ? alumno.asistencias[claseId].presente
                      ? "Presente"
                      : "Ausente"
                    : "Sin marcar"}
                </Text>
                <Button
                  bg="azul"
                  color="white"
                  size="sm"
                  onClick={() => handleMarcarAsistenciaClick(alumno._id, !alumno.asistencias[claseId]?.presente)}
                >
                  Marcar Asistencia
                </Button>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text fontStyle="italic">Aún no hay alumnos inscritos en este curso.</Text>
        )}
      </Box>
    </Box>
  );
};

export default MarcarAsistencia;
