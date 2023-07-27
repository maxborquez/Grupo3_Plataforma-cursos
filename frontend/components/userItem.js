import { Box, Heading, Button, HStack } from '@chakra-ui/react';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { useRouter } from 'next/router'; // Importar useRouter

const UserItem = ({ user, onDeleteClick }) => {
  const router = useRouter(); // Obtener el router

  // Función para manejar el clic en el botón de borrar
  const handleDeleteClick = () => {
    // Mostrar SweetAlert2 para confirmar la acción de borrar
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    }).then((result) => {
      // Si el usuario hace clic en "Sí, borrar", ejecutamos la función onDeleteClick
      if (result.isConfirmed) {
        onDeleteClick(user._id);
      }
    });
  };

  // Función para manejar el clic en el botón de detalle
  const handleDetalleClick = () => {
    router.push(`/adminPages/usuarioDetalle/${user._id}`);
  };

  return (
    <Box p={4} bg="white" borderRadius="8px" mb={2}>
      <Heading as="h3" size="md" textAlign="left">
        {user.nombre} {user.apellido}
      </Heading>
      <HStack mt={2} justifyContent="flex-end">
        <Button colorScheme="blue" size="sm" onClick={handleDetalleClick}>
          Detalle
        </Button>
        <Button colorScheme="red" size="sm" onClick={handleDeleteClick}>
          Borrar
        </Button>
      </HStack>
    </Box>
  );
};

export default UserItem;
