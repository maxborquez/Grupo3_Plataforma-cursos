import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { Heading, Box, Input, Button, HStack } from '@chakra-ui/react';

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

      // Decodifica el token para acceder a los datos adicionales
      const decodedToken = jwt_decode(token);
      const userRoles = decodedToken.roles;

      // Redirige al usuario a la página correspondiente según el rol
      if (userRoles.includes('admin')) {
        router.push('/admin');
      } else if (userRoles.includes('profesor')) {
        router.push('/profesor');
      } else if (userRoles.includes('alumno')) {
        router.push('/alumno');
      } else {
        // En caso de que el rol no sea reconocido, puedes redirigir a una página por defecto o mostrar un mensaje de error.
        router.push('/error');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí puedes manejar los errores que puedan ocurrir durante la solicitud de inicio de sesión.
    }
  };

  // Si el usuario ya está autenticado, puedes redirigirlo directamente a la página correspondiente sin mostrar el formulario de inicio de sesión.
  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      const userRoles = decodedToken.roles;
      
      // Redirige al usuario a la página correspondiente según el rol
      if (userRoles.includes('admin')) {
        router.push('/pages/admin/admin.js');
      } else if (userRoles.includes('profesor')) {
        router.push('/pages/profesor/profesor.js');
      } else if (userRoles.includes('alumno')) {
        router.push('/pages/alumno/alumno.js');
      } else {
        // En caso de que el rol no sea reconocido, puedes redirigir a una página por defecto o mostrar un mensaje de error.
        router.push('/error');
      }
    }
  }, []);

  // Función para volver a la página de inicio
  const handleGoToHome = () => {
    router.push('/');
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
      <HStack spacing={4} mt={4}>
        <Button flex={1} colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
        <Button flex={1} colorScheme="blue" onClick={handleGoToHome}>
          Volver
        </Button>
      </HStack>
    </Box>
  );
};

export default LoginPage;
