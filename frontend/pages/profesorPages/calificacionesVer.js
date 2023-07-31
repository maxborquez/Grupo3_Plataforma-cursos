import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  obtenerCalificacionesPorCurso,
  eliminarCalificacion,
} from "../../data/calificacionesData";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

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
  
      // Creamos un objeto para agrupar las calificaciones por alumno
      const calificacionesAgrupadas = {};
  
      calificacionesData.forEach((calificacion) => {
        const { _id, alumno, nombre, calificacion: calif } = calificacion;
        const nombreAlumno = alumno.nombre;
  
        // Verificamos si el alumno ya existe en las calificaciones agrupadas
        if (!calificacionesAgrupadas[nombreAlumno]) {
          // Si no existe, creamos una entrada para el alumno con un array vacío de calificaciones
          calificacionesAgrupadas[nombreAlumno] = {
            alumno: nombreAlumno,
            calificaciones: [],
          };
        }
  
        // Agregamos la calificación al array de calificaciones del alumno
        calificacionesAgrupadas[nombreAlumno].calificaciones.push({
          _id,
          nombreCalificacion: nombre,
          calificacion: calif,
        });
      });
  
      // Convertimos el objeto de calificaciones agrupadas a un array
      const calificacionesArray = Object.values(calificacionesAgrupadas);
  
      setCalificaciones(calificacionesArray);
    } catch (error) {
      console.error("Error al obtener las calificaciones:", error);
    }
  };
  
  

  const handleEliminarCalificacion = async (calificacionId) => {
    try {
      console.log("ID", calificacionId);
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
  };

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
                {calificaciones.map(
                  ({ _id, nombreCalificacion, calificacion }) => {
                    console.log("ID de calificación:", _id);
                    return (
                      <SimpleGrid
                        key={nombreCalificacion}
                        columns={4} // Agregamos una columna más para el botón
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                      >
                        <Box>{nombreCalificacion}</Box>
                        <Box>{calificacion}</Box>
                        <Button
                          mt="1"
                          colorScheme="red"
                          size="xs"
                          onClick={() => handleEliminarCalificacion(_id)} // Utilizamos directamente el _id aquí
                        >
                          Eliminar
                        </Button>
                      </SimpleGrid>
                    );
                  }
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CalificacionesVer;
