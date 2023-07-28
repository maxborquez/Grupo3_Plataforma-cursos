import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

export async function createEstadistica() {
  try {
    const token = getToken();
    const response = await axios.post(`${apiUrl}/estadisticas`, {}, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la estadística:', error);
    throw new Error('No se pudo crear la estadística');
  }
}

export async function getEstadisticas() {
  try {
    const token = getToken(); 
    const response = await axios.get(`${apiUrl}/estadisticas`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
    throw new Error('No se pudieron obtener las estadísticas');
  }
}

export async function deleteEstadistica(estadisticaId) {
  try {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/estadisticas/${estadisticaId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la estadística:', error);
    throw new Error('No se pudo eliminar la estadística');
  }
}


export async function deleteAllEstadisticas() {
  try {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/estadisticas`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar todas las estadísticas:', error);
    throw new Error('No se pudieron eliminar todas las estadísticas');
  }
}

export async function getEstadisticaById(estadisticaId) {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/estadisticas/${estadisticaId}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la estadística por ID:', error);
    throw new Error('No se pudo obtener la estadística por ID');
  }
}