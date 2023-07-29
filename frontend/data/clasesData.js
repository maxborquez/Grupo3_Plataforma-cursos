import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

const obtenerClases = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/clases`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las clases:', error);
    throw error;
  }
};

const obtenerClasePorId = async (claseId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/clases/${claseId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la clase por ID:', error);
    throw error;
  }
};

const obtenerClasesPorCurso = async (cursoId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/clases/curso/${cursoId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las clases del curso:', error);
    throw error;
  }
};

const crearClase = async (cursoId, clase) => {
  try {
    const token = getToken();
    const response = await axios.post(`${apiUrl}/clases/curso/${cursoId}`, clase, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear una nueva clase:', error);
    throw error;
  }
};

const actualizarClase = async (claseId, clase) => {
  try {
    const token = getToken();
    const response = await axios.put(`${apiUrl}/clases/${claseId}`, clase, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la clase:', error);
    throw error;
  }
};

const eliminarClase = async (claseId, cursoId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/clases/${claseId}/curso/${cursoId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la clase:', error);
    throw error;
  }
};

export {
  obtenerClases,
  obtenerClasePorId,
  obtenerClasesPorCurso,
  crearClase,
  actualizarClase,
  eliminarClase,
};
