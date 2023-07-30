import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

const crearCalificacion = async (cursoId, alumnoId, profesorId, calificacion) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${apiUrl}/calificaciones/${cursoId}/alumno/${alumnoId}/profesor/${profesorId}`,
        { calificacion },
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al crear una nueva calificación:', error);
      throw error;
    }
  };
  
const obtenerCalificacionesPorCurso = async (cursoId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/calificaciones/curso/${cursoId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las calificaciones del curso:', error);
    throw error;
  }
};

const obtenerCalificacionPorId = async (calificacionId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/calificaciones/${calificacionId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la calificación por su ID:', error);
    throw error;
  }
};

const actualizarCalificacion = async (calificacionId, nuevaCalificacion) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${apiUrl}/calificaciones/${calificacionId}`,
      { calificacion: nuevaCalificacion },
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la calificación:', error);
    throw error;
  }
};

const eliminarCalificacion = async (calificacionId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/calificaciones/${calificacionId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la calificación:', error);
    throw error;
  }
};


export {
  crearCalificacion,
  obtenerCalificacionesPorCurso,
  obtenerCalificacionPorId,
  actualizarCalificacion,
  eliminarCalificacion,
};
