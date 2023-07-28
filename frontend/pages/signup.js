import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Checkbox, CheckboxGroup } from '@chakra-ui/react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    telefono: '',
    roles: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (roles) => {
    setFormData({
      ...formData,
      roles,
    });
  };

  const handleSubmit = () => {
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <FormControl id="nombre">
          <FormLabel>Nombre</FormLabel>
          <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </FormControl>

        <FormControl id="apellido">
          <FormLabel>Apellido</FormLabel>
          <Input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Correo electrónico</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>

        <FormControl id="rut">
          <FormLabel>RUT</FormLabel>
          <Input type="text" name="rut" value={formData.rut} onChange={handleChange} />
        </FormControl>

        <FormControl id="telefono">
          <FormLabel>Teléfono</FormLabel>
          <Input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
        </FormControl>

        <FormControl id="roles">
          <FormLabel>Roles</FormLabel>
          <CheckboxGroup colorScheme="teal" name="roles" value={formData.roles} onChange={handleRoleChange}>
            <Checkbox value="profesor">Profesor</Checkbox>
            <Checkbox value="estudiante">Estudiante</Checkbox>
          </CheckboxGroup>
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Registrarse
        </Button>
      </VStack>
    </Box>
  );
};

export default SignupPage;
