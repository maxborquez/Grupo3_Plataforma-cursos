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
        token: token,
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
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el curso por ID:', error);
    throw error;
  }
};

const createCurso = async (cursoData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${apiUrl}/cursos`, cursoData, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear un nuevo curso:', error);
    throw error;
  }
};

const updateCurso = async (id, cursoData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${apiUrl}/cursos/${id}`, cursoData, {
      headers: {
        token: token,
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
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el curso por ID:', error);
    throw error;
  }
};

const changeEstadoCurso = async (id, estadoData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${apiUrl}/cursos/${id}/estado`, estadoData, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el estado del curso:', error);
    throw error;
  }
};

const changeProfesor = async (id, profesorData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${apiUrl}/cursos/${id}/profesor`, profesorData, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el profesor del curso:', error);
    throw error;
  }
};

const getCursoByProfesor = async (profesorId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/cursos/profesor/${profesorId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el curso por ID del profesor:', error);
    throw error;
  }
};

const inscribirAlumnoEnCurso = async (cursoId, alumnoId) => {
  try {
    const token = getToken();
    const response = await axios.post(`${apiUrl}/cursos/${cursoId}/alumno/${alumnoId}`, null, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al inscribir al alumno en el curso:', error);
    throw error;
  }
};

const eliminarAlumno = async (cursoId, alumnoId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/cursos/${cursoId}/alumno/${alumnoId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar al alumno del curso:', error);
    throw error;
  }
};

export {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  changeEstadoCurso,
  changeProfesor,
  getCursoByProfesor,
  inscribirAlumnoEnCurso,
  eliminarAlumno,
};