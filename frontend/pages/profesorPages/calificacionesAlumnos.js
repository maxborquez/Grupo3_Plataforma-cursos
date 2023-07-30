import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { getCursoById } from "../../data/cursosData";
import { obtenerCalificacionesPorCurso } from "../../data/calificacionesData";

const CalificacionesAlumnos = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [curso, setCurso] = useState(null);
  const [calificaciones, setCalificaciones] = useState([]);

  const loadCursoDetalle = async () => {
    try {
      const response = await getCursoById(cursoId);
      if (response.state === "Success") {
        setCurso(response.data);
        const califResponse = await obtenerCalificacionesPorCurso(cursoId);
        if (califResponse.state === "Success") {
          setCalificaciones(califResponse.data);
        } else {
          console.error("Error al obtener las calificaciones:", califResponse);
        }
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

  if (!curso) {
    return <div>Cargando...</div>;
  }

  const handleCrearCalificacion = () => {
    // Aquí puedes mostrar un cuadro de diálogo o redirigir a otra página para crear una nueva calificación
    // Puedes pasar el ID del curso como parámetro a la página de creación
    // Por ejemplo: router.push(`/crear-calificacion/${cursoId}`);
  };

  const handleEditarCalificacion = (calificacionId) => {
    // Aquí puedes mostrar un cuadro de diálogo o redirigir a otra página para editar la calificación existente
    // Puedes pasar el ID de la calificación como parámetro a la página de edición
    // Por ejemplo: router.push(`/editar-calificacion/${calificacionId}`);
  };

  return (
    <Box display="flex" minHeight="100vh" bg="negro">
      <Box flexGrow={1} p={8}>
        <Heading as="h1" size="xl" mb={4}>
          Calificaciones de Alumnos - {curso.nombre}
        </Heading>
        {calificaciones.length === 0 ? (
          <Text>No hay calificaciones registradas para este curso.</Text>
        ) : (
          <Box>
            {calificaciones.map((calificacion) => (
              <Box key={calificacion._id} mb={2}>
                <Text>
                  <strong>Alumno:</strong>{" "}
                  {calificacion.alumno.nombre} {calificacion.alumno.apellido}
                </Text>
                <Text>
                  <strong>Calificación:</strong> {calificacion.calificacion}
                </Text>
                <Button
                  size="sm"
                  bg="verde"
                  color="blanco"
                  onClick={() => handleEditarCalificacion(calificacion._id)}
                  mr={2}
                >
                  Editar Calificación
                </Button>
              </Box>
            ))}
          </Box>
        )}
        <Button mt={4} size="md" bg="azul" color="blanco" onClick={handleCrearCalificacion}>
          Crear Calificación
        </Button>
      </Box>
    </Box>
  );
};

export default CalificacionesAlumnos;
