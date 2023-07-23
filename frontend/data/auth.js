import axios from 'axios';
import Cookies from 'js-cookie';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const login = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/signin`, {
      email: email,
    });

    const token = response.data.data.token;
    return token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error; // Lanza el error para que pueda ser capturado en el componente que llama a esta función.
  }
};

const logout = () => {
    // Elimina la cookie que contiene el token JWT
    Cookies.remove('jwtToken');
    // Opcionalmente, puedes realizar otras acciones necesarias después del logout.
  };

export { login, logout };
