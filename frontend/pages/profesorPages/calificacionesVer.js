import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerCalificacionesPorCurso, eliminarCalificacion } from "../../data/calificacionesData";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, VStack, SimpleGrid } from "@chakra-ui/react";

const CalificacionesVer = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    if (cursoId) {
      obtenerCalificaciones();
    }
  }, [cursoId]);

  const obtenerCalificaciones = async () => {
    try {
      const calificacionesData = await obtenerCalificacionesPorCurso(cursoId);
      const calificacionesAgrupadas = {};

      calificacionesData.forEach((calificacion) => {
        const { alumno, calificacion: calif, nombre } = calificacion;
        const nombreAlumno = alumno.nombre;
        if (!calificacionesAgrupadas[nombreAlumno]) {
          calificacionesAgrupadas[nombreAlumno] = [{ nombre, calificacion: calif }];
        } else {
          calificacionesAgrupadas[nombreAlumno].push({ nombre, calificacion: calif });
        }
      });

      const calificacionesArray = Object.entries(calificacionesAgrupadas).map(([alumno, calificaciones]) => ({
        alumno,
        calificaciones: calificaciones.map(({ nombre, calificacion }) => ({
          nombreCalificacion: nombre,
          calificacion
        }))
      }));

      setCalificaciones(calificacionesArray);
    } catch (error) {
      console.error("Error al obtener las calificaciones:", error);
    }
  };

  const handleEliminarCalificacion = async (calificacionId) => {
    try {
      if (!calificacionId) {
        console.error("ID de calificación indefinido");
        return;
      }
  
      await eliminarCalificacion(calificacionId);
      obtenerCalificaciones();
    } catch (error) {
      console.error("Error al eliminar la calificación:", error);
      // Mostrar un mensaje de error en el frontend o cualquier otra acción que desees realizar.
    }
  }

  return (
    <Box p={4} textAlign="center">
      <Heading as="h1" size="xl" mb={4}>
        Calificaciones
      </Heading>
      <Table bg="amarillo" borderRadius="8">
        <Thead>
          <Tr>
            <Th>Alumnos</Th>
            <Th>Calificaciones</Th>
          </Tr>
        </Thead>
        <Tbody bg="negro-sec">
          {calificaciones.map(({ alumno, calificaciones }) => (
            <Tr key={alumno}>
              <Td>{alumno}</Td>
              <Td>
                {calificaciones.map(({ nombreCalificacion, calificacion, _id }) => (
                  <SimpleGrid key={_id} columns={3} alignItems="center" justifyContent="center" gap={2}>
                    <Box>{nombreCalificacion}</Box>
                    <Box>{calificacion}</Box>
                    <Button
                    mt="1"
                      key={_id}
                      colorScheme="red"
                      size="xs"
                      onClick={() => handleEliminarCalificacion(_id)}
                    >
                      Eliminar
                    </Button>
                  </SimpleGrid>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CalificacionesVer;
