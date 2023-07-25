import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Función para obtener el token
const getToken = () => {
  const token = Cookies.get('jwtToken');
  return token;
};

// Función para obtener los usuarios
export async function getUsers() {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios');
  }
}

// Función para crear un nuevo usuario
export async function createUser(userData) {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.post(`${apiUrl}/users`, userData, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw new Error('No se pudo crear el usuario');
  }
}

// Función para obtener un usuario por su ID
export async function getUserById(id) {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.get(`${apiUrl}/users/${id}`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}

// Función para actualizar un usuario por su ID
export async function updateUser(id, userData) {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.put(`${apiUrl}/users/${id}`, userData, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}

// Función para eliminar un usuario por su ID
export async function deleteUser(id) {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.delete(`${apiUrl}/users/${id}`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw new Error('No se pudo eliminar el usuario');
  }
}

// Función para obtener los profesores
export const getProfesores = async () => {
  try {
    const token = getToken(); // Obtener el token usando la función getToken
    const response = await axios.get(`${apiUrl}/users/profesores`, {
      headers: {
        token: token, // Utiliza el nombre correcto del header para enviar el token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los profesores:', error);
    throw error;
  }
};
