import { useEffect, useState } from "react";
import { getEstadisticaById } from "../../data/estadisticasData";
import Sidebar from "../../components/Sidebar";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const EstadisticaDetalle = () => {
  const [estadistica, setEstadistica] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la estadística por su ID
        const estadisticaId = "64c3492d150bbc0ccdc84da3"; // Cambia esto por el ID de la estadística que desees mostrar
        const estadisticaResponse = await getEstadisticaById(estadisticaId);
        setEstadistica(estadisticaResponse);
      } catch (error) {
        console.error("Error al obtener la estadística:", error);
      }
    };

    fetchData();
  }, []);

  if (!estadistica) {
    return <div>Cargando...</div>;
  }

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box
        p={4}
        bg="#E2E8F0"
        border="1px solid #CBD5E0"
        borderRadius="8px"
        mt={4}
        mb={4}
        mr={4}
        ml={18}
        flexGrow={1}
        position="relative"
      >
        <Heading as="h1" size="xl">
          Detalle de la Estadística
        </Heading>
        <Box mt={4}>
          <Text>
            <strong>Fecha de creación:</strong> {estadistica.fecha_creacion}
          </Text>
          <Text>
            <strong>Usuarios por rol:</strong>
          </Text>
          <ul>
            {estadistica.usuarios_por_rol.map((usuarioRol) => (
              <li key={usuarioRol._id}>
                Rol: {usuarioRol.rol} - Cantidad: {usuarioRol.cantidad}
              </li>
            ))}
          </ul>
          <Text>
            <strong>Total de cursos:</strong> {estadistica.total_cursos}
          </Text>
          <Text>
            <strong>Alumnos por curso:</strong>
          </Text>
          <ul>
            {estadistica.alumnos_por_curso.map((cursoAlumnos) => (
              <li key={cursoAlumnos._id}>
                Curso: {cursoAlumnos.curso} - Cantidad: {cursoAlumnos.cantidad}
              </li>
            ))}
          </ul>
          <Text>
            <strong>Cursos por estado:</strong>
          </Text>
          <ul>
            {estadistica.cursos_por_estado.map((cursoEstado) => (
              <li key={cursoEstado._id}>
                Estado: {cursoEstado.estado} - Cursos:{" "}
                {cursoEstado.cursos.join(", ")}
              </li>
            ))}
          </ul>
          <Text>
            <strong>Porcentaje de aprobación:</strong>
          </Text>
          <ul>
            {estadistica.porcentaje_aprobacion.map((porcentajeCurso) => (
              <li key={porcentajeCurso._id}>
                Curso: {porcentajeCurso.curso} - Porcentaje:{" "}
                {porcentajeCurso.porcentaje}%
              </li>
            ))}
          </ul>
        </Box>
        <br />
        <Button colorScheme="gray" ml={4} size="sm" onClick={handleVolverClick}>
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default EstadisticaDetalle;
