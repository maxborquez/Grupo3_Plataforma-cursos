import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Button, HStack, Text, Badge, Divider, ListItem, UnorderedList, List, VStack } from '@chakra-ui/react';
import { inscribirAlumnoEnCurso, obtenerAsistenciasAlumnoCurso, getCursoById } from '../../data/cursosData'; // Importa la función obtenerAsistenciasAlumnoCurso
import SidebarAlumno from '../../components/sideBarAlumno';
import { getUserId } from '../../data/auth';

const AlumnoCursoVer = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [curso, setCurso] = useState(null);
  const [asistencias, setAsistencias] = useState([]); // Estado para almacenar las asistencias del alumno

  useEffect(() => {
    const loadCursoDetalle = async () => {
      try {
        const response = await getCursoById(cursoId);
        if (response.state === 'Success') {
          setCurso(response.data);
        } else {
          console.error('Error al obtener los detalles del curso:', response);
        }
      } catch (error) {
        console.error('Error al cargar los detalles del curso:', error);
      }
    };

    const loadAsistenciasAlumno = async () => {
      try {
        const alumnoId = getUserId(); // Obtener el ID del alumno desde el token
        if (!alumnoId) {
          console.error('Error al obtener el ID del alumno desde el token.');
          return;
        }

        const response = await obtenerAsistenciasAlumnoCurso(cursoId, alumnoId);
        setAsistencias(response.data);
      } catch (error) {
        console.error('Error al obtener las asistencias del alumno:', error);
      }
    };

    if (cursoId) {
      loadCursoDetalle();
      loadAsistenciasAlumno();
    }
  }, [cursoId]);

  if (!curso) {
    return <div>Cargando...</div>;
  }

  const handleVolverClick = () => {
    router.back();
  };

  const handleInscribirClick = async () => {
    try {
      const alumnoId = getUserId(); // Obtener el ID del alumno desde el token
      if (!alumnoId) {
        console.error('Error al obtener el ID del alumno desde el token.');
        return;
      }

      console.log('cursoId:', cursoId);
      console.log('alumnoId:', alumnoId);

      // Llamar a la función inscribirAlumnoEnCurso con los IDs del curso y el alumno
      const response = await inscribirAlumnoEnCurso(cursoId, alumnoId);
      console.log('Respuesta de inscripción:', response);
      // Aquí puedes mostrar un mensaje de éxito o realizar otras acciones después de la inscripción
    } catch (error) {
      console.error('Error al inscribir alumno en el curso:', error);
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones en caso de error
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <SidebarAlumno />
      <Box
        p={4}
        bg="negro-sec"
        color="amarillo"
        border="1px solid #CBD5E0"
        borderRadius="8px"
        mt={4}
        ml={18}
        flexGrow={1}
      >
        <Heading as="h1" size="xl">
          {curso.nombre}
        </Heading>
        <Text fontSize="lg" mt={2}>
          {curso.descripcion}
        </Text>
        <Box mt={4}>
          <Heading as="h3" size="lg">
            Información del curso
          </Heading>
          <VStack align="flex-start" mt={2} spacing={4}>
            <Text>
              <strong>Estado:</strong>{" "}
              <Badge
                colorScheme={curso.estado === "Disponible" ? "green" : "red"}
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
            <Divider />
            <Text>
              <strong>Clases:</strong>
              {curso.clases.length > 0 ? (
                <UnorderedList ml={4}>
                  {curso.clases.map((clase) => (
                    <ListItem key={clase._id}>
                      {clase.nombre} - Fecha:{" "}
                      {new Date(clase.fecha).toLocaleDateString()}
                    </ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay clases disponibles.
                </Text>
              )}
            </Text>
            <Divider />
            <Text>
              <strong>Avisos:</strong>
              {curso.avisos.length > 0 ? (
                <UnorderedList ml={4}>
                  {curso.avisos.map((aviso) => (
                    <ListItem key={aviso._id}>{aviso.contenido}</ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay avisos disponibles.
                </Text>
              )}
            </Text>
            <Divider />
            <Text>
              <strong>Calificaciones:</strong>
              {curso.calificaciones.length > 0 ? (
                <List ml={4}>
                  {curso.calificaciones.map((calificacion) => (
                    <ListItem key={calificacion}>{calificacion}</ListItem>
                  ))}
                </List>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay calificaciones disponibles.
                </Text>
              )}
            </Text>
            <Divider />
            <Text>
              <strong>Alumnos:</strong>
              {curso.alumnos.length > 0 ? (
                <UnorderedList ml={4}>
                  {curso.alumnos
                    .filter((alumno) => alumno.alumno) // Filtrar para eliminar elementos nulos o sin alumno
                    .map((alumno) => (
                      <ListItem key={alumno._id}>
                        {alumno.alumno.nombre} {alumno.alumno.apellido} -
                        Estado: {alumno.estado}
                      </ListItem>
                    ))}
                </UnorderedList>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay alumnos inscritos.
                </Text>
              )}
            </Text>
          </VStack>
        </Box>
        <Box mt={4}>
          <Heading as="h3" size="lg">
            Asistencia del alumno
          </Heading>
          <VStack align="flex-start" mt={2} spacing={4}>
            {asistencias.length > 0 ? (
              <UnorderedList ml={4}>
                {asistencias.map((asistencia) => (
                  <ListItem key={asistencia._id}>
                    Fecha: {new Date(asistencia.fecha).toLocaleDateString()} - Estado: {asistencia.estado}
                  </ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text ml={4} fontStyle="italic">
                Aún no hay asistencias registradas.
              </Text>
            )}
          </VStack>
        </Box>
        <HStack mt={4} justifyContent="flex-end">
          <Button bg="naranja" color="blanco" size="sm" onClick={handleVolverClick}>
            Volver
          </Button>
          <Button bg="cafe"color="blanco" size="sm" onClick={handleInscribirClick}>
            Inscribir
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default AlumnoCursoVer;
