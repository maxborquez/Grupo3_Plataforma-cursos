import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

const getCursos = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/cursos`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    throw error;
  }
};

const getCursoById = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/cursos/${id}`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el curso por ID:', error);
    throw error;
  }
};

const createCurso = async (profesorId, cursoData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${apiUrl}/cursos/${profesorId}`, cursoData, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear un nuevo curso:', error);
    throw error;
  }
};

const updateCurso = async (id, profesorId, cursoData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${apiUrl}/cursos/${id}/${profesorId}`, cursoData, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el curso por ID:', error);
    throw error;
  }
};

const deleteCurso = async (id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/cursos/${id}`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el curso por ID:', error);
    throw error;
  }
};

export { getCursos, getCursoById, createCurso, updateCurso, deleteCurso };
