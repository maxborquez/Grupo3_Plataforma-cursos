import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Switch } from "@chakra-ui/react";
import { getCursoById } from "../../data/cursosData";
import { getAsistenciasByCursoYClase } from "../../data/asistenciaData";

const MarcarAsistencia = () => {
  const router = useRouter();
  const { cursoId, claseId } = router.query;
  const [curso, setCurso] = useState(null);
  const [asistencias, setAsistencias] = useState([]);

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

  const loadAsistencias = async () => {
    try {
      const response = await getAsistenciasByCursoYClase(cursoId, claseId);
      if (response.state === "Success") {
        setAsistencias(response.data);
      } else {
        console.error("Error al obtener las asistencias:", response);
      }
    } catch (error) {
      console.error("Error al cargar las asistencias:", error);
    }
  };

  useEffect(() => {
    if (cursoId && claseId) {
      loadCursoDetalle();
      loadAsistencias();
    }
  }, [cursoId, claseId]);

  const handleAsistenciaChange = async (alumnoId, nuevaAsistencia) => {
    try {
      // Llamada a la función marcarAsistencia para actualizar la asistencia
      await marcarAsistencia(alumnoId, cursoId, claseId, nuevaAsistencia);

      // Después de actualizar la asistencia en el backend, actualiza el estado local
      setAsistencias(asistencias.map((asistencia) => {
        if (asistencia.alumno._id === alumnoId) {
          return { ...asistencia, asistencia: nuevaAsistencia };
        }
        return asistencia;
      }));

      // Si no hay asistencias, establecer la asistencia como false para todos los alumnos
      if (asistencias.length === 0) {
        const updatedAsistencias = curso.alumnos.map((alumno) => ({
          alumno: { ...alumno },
          asistencia: false,
        }));
        setAsistencias(updatedAsistencias);
      }
    } catch (error) {
      console.error("Error al actualizar la asistencia:", error);
    }
  };

  if (!curso) {
    return <div>Cargando...</div>;
  }

  const alumnosConAsistencia = asistencias.length === 0 ? curso.alumnos.map(alumno => ({ ...alumno, asistencia: false })) : asistencias;

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      {alumnosConAsistencia.map((alumno) => (
        <div key={alumno._id}>
          {alumno.alumno.nombre} {alumno.alumno.apellido} - Estado:{" "}
          {alumno.asistencia ? "Asistió" : "No asistió"}
          <Switch
            ml={4}
            isChecked={alumno.asistencia}
            onChange={() =>
              handleAsistenciaChange(alumno._id, !alumno.asistencia)
            }
            colorScheme="teal"
            size="lg"
          />
        </div>
      ))}
    </div>
  );
};

export default MarcarAsistencia;
