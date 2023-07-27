// pages/usuarioDetalle.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { getUserById, deleteUser } from "../../data/usersData"; // Importar la función getUserById y deleteUser
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2"; // Importa SweetAlert 2

const UsuarioDetalle = () => {
  const router = useRouter();
  const { userId } = router.query; // Obtener el parámetro "userId" de la URL

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUserById(userId); // Obtener el usuario por su ID
        setUser(userResponse.data); // Establecer el usuario en el estado
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // Si el usuario aún no se ha cargado, mostrar un mensaje de carga
  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleEditarClick = () => {
    // Redireccionar a la página de edición de usuario
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
          await deleteUser(userId); // Eliminar el usuario utilizando la función deleteUser
          Swal.fire({
            title: "Usuario eliminado exitosamente",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Redireccionar a la página anterior al hacer clic en "OK"
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
        position="relative" // Para permitir posicionar los botones dentro de este contenedor
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
          {/* Agregar los botones de Editar y Borrar aquí */}
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
