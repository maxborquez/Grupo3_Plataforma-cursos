// Sidebar.js
import React from 'react';
import { Box, Button, Stack, Image } from '@chakra-ui/react';
import { logout } from '../data/auth';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Box
      bg="negro-sec"
      color="cafe"
      w="180px"
      flexShrink={0}
      borderRadius="8px"
      p={4}
      fontFamily="Baloo Bhai, sans-serif"
      mt={4}
      mb={4}
      ml={18}
      display="flex"
      flexDirection="column"
    >
      <Stack spacing={4}>
        <Image src="/logo.png" width={150} alignContent='center' alt="Logo" mb={4} />
        <Button
          onClick={() => router.push('/adminPages/cursosAdmin')}
          variant="solid"
          colorScheme="amarillo"
          color="blanco"
          _hover={{ color: 'negro-sec', bg: 'amarillo' }}
        >
          Cursos
        </Button>
        <Button
          onClick={() => router.push('/adminPages/usuariosAdmin')}
          variant="solid"
          colorScheme="amarillo"
          color="blanco"
          _hover={{ color: 'negro-sec', bg: 'amarillo' }}
        >
          Usuarios
        </Button>
        <Button
          onClick={() => router.push('/adminPages/estadisticasAdmin')}
          variant="solid"
          colorScheme="amarillo"
          color="blanco"
          _hover={{ color: 'negro-sec', bg: 'amarillo' }}
        >
          Estadísticas
        </Button>
        <Button
          onClick={() => router.push('/adminPages/inscribirAlumno')}
          variant="solid"
          colorScheme="amarillo"
          color="blanco"
          _hover={{ color: 'negro-sec', bg: 'amarillo' }}
        >
          Inscribir alumno
        </Button>
      </Stack>

      <Box mt="auto" />

      <Button
        onClick={handleLogout}
        variant="ghost"
        colorScheme="amarillo"
        color="blanco"
        _hover={{ color: 'negro-sec', bg: 'amarillo' }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
