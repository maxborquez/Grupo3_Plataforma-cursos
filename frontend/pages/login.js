import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Heading, Box, Input, Button } from '@chakra-ui/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}auth/signin`, {
        email: email,
      });

      const token = response.data.data.token;

      // Guarda el token en una cookie llamada "jwtToken"
      Cookies.set('jwtToken', token);

      // Redirige al usuario a una página de inicio de sesión exitosa, por ejemplo:
      router.push('/admin');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí puedes manejar los errores que puedan ocurrir durante la solicitud de inicio de sesión.
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={8} p={4}>
      <Heading mb={4}>Iniciar sesión</Heading>
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={4}
      />
      <Button colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
