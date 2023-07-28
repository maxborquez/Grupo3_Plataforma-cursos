import { useState, useEffect } from 'react';
import { Box, Heading, Input, Button, Flex, Select } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import { createCurso } from '../../data/cursosData';
import { getProfesores } from '../../data/usersData';
import { useRouter } from 'next/router';

const CursoCreate = () => {
  const router = useRouter();
  const [cursoData, setCursoData] = useState({
    nombre: '',
    descripcion: '',
    estado: '',
    fecha_inicio: '',
    fecha_fin: '',
    profesor: '',
  });

  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    loadProfesores();
  }, []);

  const loadProfesores = async () => {
    try {
      const response = await getProfesores();
      const profesoresData = response.data;
      setProfesores(profesoresData);
    } catch (error) {
      console.error('Error al cargar los profesores:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCursoData({
      ...cursoData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createCurso(cursoData);
      router.push('/adminPages/cursosAdmin');
    } catch (error) {
      console.error('Error al crear el curso:', error);
    }
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box p={4} mt={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif">
        <Box bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" p={4} mb={4}>
          <Heading as="h1" size="xl">
            Crear un nuevo curso
          </Heading>
        </Box>

        <Box flex="2" bg="#E2E8F0" border="1px solid #CBD5E0" borderRadius="8px" p={4}>
          <Flex flexDirection="column">
            <Input
              name="nombre"
              placeholder="Nombre del curso"
              value={cursoData.nombre}
              onChange={handleChange}
              mb={4}
            />
            <Input
              name="descripcion"
              placeholder="Descripción del curso"
              value={cursoData.descripcion}
              onChange={handleChange}
              mb={4}
            />
            <Select
              name="estado"
              placeholder="Estado del curso"
              value={cursoData.estado}
              onChange={handleChange}
              mb={4}
            >
              <option value="Disponible">Disponible</option>
              <option value="Próximo">Próximo</option>
              <option value="Cerrado">Cerrado</option>
            </Select>
            <Input
              type="date"
              name="fecha_inicio"
              placeholder="Fecha de inicio"
              value={cursoData.fecha_inicio}
              onChange={handleChange}
              mb={4}
            />
            <Input
              type="date"
              name="fecha_fin"
              placeholder="Fecha de fin"
              value={cursoData.fecha_fin}
              onChange={handleChange}
              mb={4}
            />
            <Select
              name="profesor"
              placeholder="Selecciona un profesor"
              value={cursoData.profesor}
              onChange={handleChange}
              mb={4}
            >
              {profesores.map((profesor) => (
                <option key={profesor._id} value={profesor._id}>
                  {`${profesor.nombre} ${profesor.apellido}`}
                </option>
              ))}
            </Select>
            <Button colorScheme="green" onClick={handleSubmit}>
              Crear Curso
            </Button>
            <Button colorScheme="gray" onClick={handleVolverClick}>
              Volver
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CursoCreate;
