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

    Cookies.set('jwtToken', token);

    return token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

const logout = () => {
  Cookies.remove('jwtToken');
};

const getUserRole = () => {
  const token = Cookies.get('jwtToken');

  if (token) {
    const decodedToken = jwt_decode(token);
    const userRoles = decodedToken.roles;
    return userRoles || [];
  }

  return [];
};

const getUserId = () => {
  const token = Cookies.get('jwtToken');

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      return userId;
    } catch (error) {
      console.error('Error decoding JWT:', error.message);
    }
  }

  return null;
};
export { login, logout, getUserRole, getUserId };