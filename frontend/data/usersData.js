import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

export async function getUsers() {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios');
  }
}

export async function createUser(userData) {
  try {
    const token = getToken();
    const response = await axios.post(`${apiUrl}/users`, userData, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw new Error('No se pudo crear el usuario');
  }
}


export async function getUserById(id) {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/users/${id}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}

export async function updateUser(id, userData) {
  try {
    const token = getToken();
    const response = await axios.put(`${apiUrl}/users/${id}`, userData, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}

export async function deleteUser(id) {
  try {
    const token = getToken();
    const response = await axios.delete(`${apiUrl}/users/${id}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw new Error('No se pudo eliminar el usuario');
  }
}

export const getProfesores = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${apiUrl}/users/profesores`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los profesores:', error);
    throw error;
  }
};
