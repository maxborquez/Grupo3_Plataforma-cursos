import { Box, Heading, Button, HStack } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const UserItem = ({ user, onDeleteClick }) => {
  const router = useRouter();

  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    }).then((result) => {

      if (result.isConfirmed) {
        onDeleteClick(user._id);
      }
    });
  };

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
