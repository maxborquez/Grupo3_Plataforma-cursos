// auth.js

import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const login = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/signin`, {
      email: email,
    });

    const token = response.data.data.token;

    // Almacenar el token en la cookie
    Cookies.set('jwtToken', token);

    return token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

const logout = () => {
  // Elimina la cookie que contiene el token JWT
  Cookies.remove('jwtToken');
  // Opcionalmente, puedes realizar otras acciones necesarias después del logout.
};

const getUserRole = () => {
  const token = Cookies.get('jwtToken');

  if (token) {
    const decodedToken = jwt_decode(token);
    const userRoles = decodedToken.roles;
    return userRoles || []; // Si no se encuentra el rol en el token, devolver un array vacío
  }

  return []; // Si no hay token, devolver un array vacío
};

export { login, logout, getUserRole };