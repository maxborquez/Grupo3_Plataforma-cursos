import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerCalificacionesPorCurso } from "../../data/calificacionesData";

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
      // Agrupar las calificaciones por el nombre del alumno
      const calificacionesAgrupadas = {};
      calificacionesData.forEach((calificacion) => {
        const { alumno, calificacion: calif } = calificacion;
        const nombreAlumno = alumno.nombre;
        if (!calificacionesAgrupadas[nombreAlumno]) {
          calificacionesAgrupadas[nombreAlumno] = [calif];
        } else {
          calificacionesAgrupadas[nombreAlumno].push(calif);
        }
      });
      // Convertir el objeto de calificaciones agrupadas en un array
      const calificacionesArray = Object.entries(calificacionesAgrupadas).map(([alumno, calificaciones]) => ({
        alumno,
        calificaciones: calificaciones.join(", ")
      }));
      setCalificaciones(calificacionesArray);
    } catch (error) {
      console.error("Error al obtener las calificaciones:", error);
    }
  };

  return (
    <div>
      <h1>Calificaciones</h1>
      <ul>
        {calificaciones.map(({ alumno, calificaciones }) => (
          <li key={alumno}>
            <p>Alumno: {alumno}</p>
            <p>Calificaciones: {calificaciones}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalificacionesVer;
