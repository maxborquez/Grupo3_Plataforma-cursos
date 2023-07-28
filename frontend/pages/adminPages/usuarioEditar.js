import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { getUserById, updateUser } from "../../data/usersData";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";

const UsuarioEditar = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    rut: "",
    telefono: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUserById(userId);
        setUser(userResponse.data);
        setFormData({
          nombre: userResponse.data.nombre,
          apellido: userResponse.data.apellido,
          email: userResponse.data.email,
          rut: userResponse.data.rut,
          telefono: userResponse.data.telefono,
        });
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVolverClick = () => {
    router.back();
  };

  const handleGuardarClick = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción actualizará el perfil del usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateUser(userId, formData);
          Swal.fire({
            title: "Perfil actualizado",
            text: "Los cambios han sido guardados exitosamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            router.push(`/adminPages/usuarioDetalle/${userId}`);
          });
        } catch (error) {
          console.error("Error al actualizar el usuario:", error);
          Swal.fire("Error", "Hubo un problema al guardar los cambios.", "error");
        }
      } else {
        Swal.fire("Cancelado", "Los cambios no han sido guardados.", "info");
      }
    });
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

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
      >
        <Heading as="h1" size="xl">
          Editar Usuario
        </Heading>
        <Box mt={4}>
          <FormControl id="nombre" mb={4}>
            <FormLabel>Nombre:</FormLabel>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="apellido" mb={4}>
            <FormLabel>Apellido:</FormLabel>
            <Input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="rut" mb={4}>
            <FormLabel>RUT:</FormLabel>
            <Input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="telefono" mb={4}>
            <FormLabel>Teléfono:</FormLabel>
            <Input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button colorScheme="gray" mr={4} size="sm" onClick={handleVolverClick}>
              Volver
          </Button>
          <Button colorScheme="blue" size="sm" onClick={handleGuardarClick}>
            Guardar cambios
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UsuarioEditar;
