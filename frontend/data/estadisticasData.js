import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Función para obtener el token
const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

// Función para crear una nueva estadística
export async function createEstadistica() {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.post(`${apiUrl}/estadisticas`, {}, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la estadística:', error);
    throw new Error('No se pudo crear la estadística');
  }
}

// Función para obtener todas las estadísticas
export async function getEstadisticas() {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.get(`${apiUrl}/estadisticas`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
    throw new Error('No se pudieron obtener las estadísticas');
  }
}

// Función para eliminar una estadística por su ID
export async function deleteEstadistica(estadisticaId) {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.delete(`${apiUrl}/estadisticas/${estadisticaId}`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la estadística:', error);
    throw new Error('No se pudo eliminar la estadística');
  }
}

// Función para eliminar todas las estadísticas
export async function deleteAllEstadisticas() {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.delete(`${apiUrl}/estadisticas`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar todas las estadísticas:', error);
    throw new Error('No se pudieron eliminar todas las estadísticas');
  }
}
