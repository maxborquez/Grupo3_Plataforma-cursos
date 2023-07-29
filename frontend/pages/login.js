import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Heading, Box, Input, Button, HStack } from '@chakra-ui/react';
import { login, getUserRole } from '../data/auth';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await login(email);

      Cookies.set('jwtToken', token);

      const userRoles = getUserRole(token);

      if (userRoles.includes('admin')) {
        router.push('/adminPages/cursosAdmin');
      } else if (userRoles.includes('profesor')) {
        router.push('/profesorPages/profesor');
      } else if (userRoles.includes('alumno')) {
        router.push('/alumnoPages/alumno');
      } else {
        router.push('/error');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      const userRoles = getUserRole(jwtToken);

      if (userRoles.includes('admin')) {
        router.push('/adminPages/admin');
      } else if (userRoles.includes('profesor')) {
        router.push('/profesorPages/profesor');
      } else if (userRoles.includes('alumno')) {
        router.push('/alumnoPages/alumno');
      } else {
        router.push('/error');
      }
    }
  }, []);

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
