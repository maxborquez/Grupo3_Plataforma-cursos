// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Crear el objeto de la solicitud con el campo "email".
      const requestBody = {
        email,
      };

      // Realizar la llamada al backend para hacer el inicio de sesión y obtener el token.
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}auth/signin`, requestBody);

      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken); // Almacenar el token en el localStorage.
        router.push('/dashboard'); // Redirigir a la página del dashboard.
      } else {
        // Manejar errores de inicio de sesión si el backend responde con un error.
        console.error('Error en inicio de sesión.');
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <FormControl id="email">
          <FormLabel>Correo electrónico</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <Button colorScheme="teal" onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
