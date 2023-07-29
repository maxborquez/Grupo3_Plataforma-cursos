import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

const crearAviso = async (cursoId, profesorId,contenido) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${apiUrl}/avisos/curso/${cursoId}/profesor/${profesorId}`,
        { contenido },
        {
            headers: {
                token: token,
              },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al crear un nuevo aviso:', error);
      throw error;
    }
  };
  
  const verAvisosPorCurso = async (cursoId) => {
    try {
      const token = getToken();
      const response = await axios.get(`${apiUrl}/avisos/${cursoId}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los avisos del curso:', error);
      throw error;
    }
  };
  
  const borrarAviso = async (avisoId) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${apiUrl}/avisos/${avisoId}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
      throw error;
    }
  };
  
  const getAvisoPorId = async (avisoId) => {
    try {
      const token = getToken();
      const response = await axios.get(`${apiUrl}/avisos/${avisoId}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el aviso por su ID:', error);
      throw error;
    }
  };
  const actualizarAviso = async (avisoId, avisoData) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${apiUrl}/avisos/${avisoId}`,
        avisoData,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el aviso:', error);
      throw error;
    }
  };
  
  
  export {
    crearAviso,
    verAvisosPorCurso,
    borrarAviso,
    getAvisoPorId, 
    actualizarAviso
  };