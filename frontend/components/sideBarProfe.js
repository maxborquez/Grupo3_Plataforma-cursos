import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { logout } from '../data/auth';
import { useRouter } from 'next/router';

const SidebarProfe = () => {
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
      bg="black"
      color="white"
      w="180px"
      flexShrink={0}
      p={4}
      borderRadius="10px"
      fontFamily="Baloo Bhai, sans-serif"
      mt={4}
      mb={4}
      ml={18}
      display="flex"
      flexDirection="column"
    >
      {/* Contenido de la barra lateral */}
      <Stack spacing={4}>
        <Button onClick={() => router.push('/profesorPages/profesor')} variant="ghost" color="white" colorScheme="whiteAlpha">
          Página principal
        </Button>
        <Button onClick={() => router.push('/profesorPages/cursosProfe')} variant="ghost" color="white" colorScheme="whiteAlpha">
          Cursos
        </Button>
      </Stack>

      {/* Espacio de 18px para separar los botones del botón de logout */}
      <Box mt="auto" />

      {/* Botón de Logout en la parte inferior */}
      <Button onClick={handleLogout} variant="ghost" color="white" colorScheme="whiteAlpha">
        Logout
      </Button>
    </Box>
  );
};

export default SidebarProfe;
