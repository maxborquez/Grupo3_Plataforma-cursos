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
} from "@chakra-ui/react";

const CalificacionesVer = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [alumnos, setAlumnos] = useState([]);

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
        const { _id, alumno, nombre, calificacion: calif } = calificacion;
        const nombreAlumno = alumno.nombre;

        if (!calificacionesAgrupadas[nombreAlumno]) {
          calificacionesAgrupadas[nombreAlumno] = {
            alumno: nombreAlumno,
            calificaciones: [],
          };
        }

        calificacionesAgrupadas[nombreAlumno].calificaciones.push({
          _id,
          nombreCalificacion: nombre,
          calificacion: calif,
        });
      });

      const alumnosArray = Object.values(calificacionesAgrupadas);

      setAlumnos(alumnosArray);
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
    }
  };

  const handleEditarCalificacion = (calificacionId) => {
    try {
      if (!calificacionId) {
        console.error("ID de calificación indefinido");
        return;
      }
  
      // Aquí deberías pasar los datos de la calificación a editar como query params
      router.push(`/profesorPages/calificacionesEditar/${calificacionId}`);
    } catch (error) {
      console.error("Error al editar la calificación:", error);
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
            <Th>Nombre de Calificación</Th>
            <Th>Calificación</Th>
            <Th>Eliminar</Th>
            <Th>Editar</Th>
          </Tr>
        </Thead>
        <Tbody bg="negro-sec">
          {alumnos.map(({ alumno, calificaciones }) => (
            <React.Fragment key={alumno}>
              {calificaciones.map(({ nombreCalificacion, calificacion, _id }, index) => (
                <Tr key={_id}>
                  {index === 0 && <Td rowSpan={calificaciones.length}>{alumno}</Td>}
                  <Td>{nombreCalificacion}</Td>
                  <Td>{calificacion}</Td>
                  <Td>
                    <Button
                        key={_id}
                        bg="red"
                        color="white"
                        size="sm"
                      onClick={() => handleEliminarCalificacion(_id)}
                    >
                      Eliminar
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      key={_id}
                      bg="cafe"
                      color="white"
                      size="sm"
                      onClick={() => handleEditarCalificacion(_id)}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CalificacionesVer;
