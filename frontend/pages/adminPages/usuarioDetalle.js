import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading, Text, Button, Divider} from "@chakra-ui/react";
import { getUserById, deleteUser } from "../../data/usersData";
import Sidebar from "../../components/sideBar";
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
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Sí, borrar",
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
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar el usuario.",
            "error"
          );
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
      bg="transparent"
      borderRadius="8px"
      ml={10}
      mt={5}
      mb={5}
      mr={10}
      flexGrow={1}
      maxWidth="800px" // Limitar el ancho máximo del contenido principal
      mx="auto" // Centrar horizontalmente el contenido
    >
      <Box bg="negro-sec" borderRadius="8px" p={4}>
        <Heading as="h1" size="xl">
          Datos del Usuario
        </Heading>
        <Divider />
      </Box>
      <Box bg="amarillo" color="cafe" border="40px solid #313236" borderRadius="8px" p={4} mt={4}> {/* Ajustar el padding y el margen superior */}
        <Text>
          <strong>Nombre:</strong> {user.nombre} {user.apellido}
        </Text>
        <br />
        <Text>
          <strong>Email:</strong> {user.email}
        </Text>
        <br />
        <Text>
          <strong>RUT:</strong> {user.rut}
        </Text>
        <br />
        <Text>
          <strong>Teléfono:</strong> {user.telefono}
        </Text>
        <br />
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            bg="cafe"
            color="blanco"
            ml={4}
            size="sm"
            onClick={handleEditarClick}
          >
            Editar
          </Button>
          <Button
            colorScheme="red"
            ml={4}
            size="sm"
            onClick={handleBorrarClick}
          >
            Borrar
          </Button>
          <Button
            bg="naranja"
            color="blanco"
            ml={4}
            size="sm"
            onClick={handleVolverClick}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);
};

export default UsuarioDetalle;
