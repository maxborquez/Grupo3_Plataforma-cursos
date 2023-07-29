import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

const marcarAsistencia = async (alumnoId, cursoId, claseId, presente) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${apiUrl}/curso/${cursoId}/clase/${claseId}/alumno/${alumnoId}`,
      { presente },
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al marcar asistencia:', error);
    throw error;
  }
};

const corregirAsistencia = async (alumnoId, cursoId, claseId, presente) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${apiUrl}/curso/${cursoId}/clase/${claseId}/alumno/${alumnoId}`,
      { presente },
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al corregir asistencia:', error);
    throw error;
  }
};

const obtenerEstadisticasAsistencia = async (cursoId, alumnoId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/${cursoId}/alumno/${alumnoId}/estadisticas`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas de asistencia:', error);
    throw error;
  }
};

const obtenerAsistenciasAlumnoCurso = async (cursoId, alumnoId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/${cursoId}/alumno/${alumnoId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener asistencias del alumno en el curso:', error);
    throw error;
  }
};

const obtenerEstadisticasAsistenciaCurso = async (cursoId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/${cursoId}/estadisticas`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas de asistencia del curso:', error);
    throw error;
  }
};

export {
  marcarAsistencia,
  corregirAsistencia,
  obtenerEstadisticasAsistencia,
  obtenerAsistenciasAlumnoCurso,
  obtenerEstadisticasAsistenciaCurso,
};