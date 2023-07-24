// Login.js

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Heading, Box, Input, Button, HStack } from '@chakra-ui/react';
import { login, getUserRole } from '../data/auth'; // Verifica si estás importando correctamente la función login y getUserRole desde auth.js

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await login(email);

      // Guarda el token en una cookie llamada "jwtToken"
      Cookies.set('jwtToken', token);

      // Obtén los roles del usuario desde el token decodificado
      const userRoles = getUserRole(token);

      // Redirige al usuario a la página correspondiente según el rol
      if (userRoles.includes('admin')) {
        router.push('/adminPages/admin');
      } else if (userRoles.includes('profesor')) {
        router.push('/profesorPages/profesor');
      } else if (userRoles.includes('alumno')) {
        router.push('/alumnoPages/alumno');
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
      const userRoles = getUserRole(jwtToken);
      
      // Redirige al usuario a la página correspondiente según el rol
      if (userRoles.includes('admin')) {
        router.push('/adminPages/admin');
      } else if (userRoles.includes('profesor')) {
        router.push('/profesorPages/profesor');
      } else if (userRoles.includes('alumno')) {
        router.push('/alumnoPages/alumno');
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
