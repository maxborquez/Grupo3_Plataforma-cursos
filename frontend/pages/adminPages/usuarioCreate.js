import { useState } from 'react';
import { Box, Heading, Input, Select, Button } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { createUser } from '../../data/usersData';
import { useRouter } from 'next/router';

const UsuarioCreate = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    telefono: '',
    roles: ['alumno'],
  });

  const handleInputChange = (e) => {
    const value = e.target.name === 'roles' ? [e.target.value] : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleVolverClick = () => {
    router.back();
  };

  const handleGuardarUsuario = async () => {
    try {
      console.log(formData);
      await createUser(formData);
      router.push('/adminPages/usuariosAdmin');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box p={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif">
        <Heading as="h1" size="xl">
          Crear Nuevo Usuario
        </Heading>
        <Box mt={4}>
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            mt={2}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            mt={2}
          />
          <Input
            type="text"
            name="rut"
            placeholder="RUT"
            value={formData.rut}
            onChange={handleInputChange}
            mt={2}
          />
          <Input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleInputChange}
            mt={2}
          />
          <Select name="roles" value={formData.roles[0]} onChange={handleInputChange} mt={2}>
            <option value="alumno">Alumno</option>
            <option value="profesor">Profesor</option>
            <option value="admin">Administrador</option>
          </Select>
          <Button colorScheme="blue" mt={4} onClick={handleGuardarUsuario}>
            Guardar Usuario
          </Button>
          <Button colorScheme="gray" mt={4} onClick={handleVolverClick}>
            Volver
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UsuarioCreate;
