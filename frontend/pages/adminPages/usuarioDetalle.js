// pages/usuarioDetalle.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { getUserById, deleteUser } from "../../data/usersData";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";

const UsuarioDetalle = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUserById(userId);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleEditarClick = () => {
    router.push(`/adminPages/usuarioEditar/${userId}`);
  };

  const handleVolverClick = () => {
    router.back();
  };

  const handleBorrarClick = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId);
          Swal.fire({
            title: "Usuario eliminado exitosamente",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => { 
            router.back();
          });
        } catch (error) {
          Swal.fire("Error", "Hubo un problema al eliminar el usuario.", "error");
          console.error("Error al borrar el usuario:", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "El usuario no ha sido eliminado.", "info");
      }
    });
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box
        p={4}
        bg="#E2E8F0"
        border="1px solid #CBD5E0"
        borderRadius="8px"
        mt={4}
        mb={4}
        mr={4}
        ml={18}
        flexGrow={1}
        position="relative"
      >
        <Heading as="h1" size="xl">
          Detalle del Usuario
        </Heading>
        <Box mt={4}>
          <Text>
            <strong>Nombre:</strong> {user.nombre} {user.apellido}
          </Text>
          <Text>
            <strong>Email:</strong> {user.email}
          </Text>
          <Text>
            <strong>RUT:</strong> {user.rut}
          </Text>
          <Text>
            <strong>Teléfono:</strong> {user.telefono}
          </Text>
        </Box>
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button colorScheme="blue" ml={4} size="sm" onClick={handleEditarClick}>
            Editar
          </Button>
          <Button colorScheme="red" ml={4} size="sm" onClick={handleBorrarClick}>
            Borrar
          </Button>
          <Button colorScheme="gray" ml={4} size="sm" onClick={handleVolverClick}>
              Volver
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UsuarioDetalle;
