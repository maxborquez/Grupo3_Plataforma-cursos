import React, { useState, useEffect } from "react";
import { Select, Button, VStack, Box, Heading } from "@chakra-ui/react";
import { getUsers } from "../../data/usersData";
import {
  inscribirAlumnoEnCurso,
  getCursos,
  eliminarAlumno,
} from "../../data/cursosData";
import Sidebar from "../../components/sideBar";
import Swal from 'sweetalert2';

const InscribirAlumnoPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [selectedAlumnoId, setSelectedAlumnoId] = useState("");
  const [selectedCursoId, setSelectedCursoId] = useState("");

  useEffect(() => {
    fetchUsersData();
    fetchCursosData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const usersData = await getUsers();
      const alumnos = usersData.data.filter((user) =>
        user.roles.some((role) => role.name === "alumno")
      );
      setAlumnos(alumnos);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const fetchCursosData = async () => {
    try {
      const cursosData = await getCursos();
      setCursos(cursosData.data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  const handleInscribirAlumnoClick = async () => {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres inscribir al alumno en este curso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, inscribir",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await inscribirAlumnoEnCurso(selectedCursoId, selectedAlumnoId);
          Swal.fire(
            "¡Inscrito!",
            "El alumno ha sido inscrito en el curso.",
            "success"
          );
        }
      });
    } catch (error) {
      console.error('Error al inscribir al alumno en el curso:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo inscribir al alumno.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Cerrar',
      });
    }
  };

const handleDesinscribirAlumnoClick = async () => {
  try {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres desinscribir al alumno de este curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, desinscribir",
    });

    if (result.isConfirmed) {
      await eliminarAlumno(selectedCursoId, selectedAlumnoId);
      Swal.fire(
        "Desincrito!",
        "El alumno ha sido desinscrito en el curso.",
        "success"
      );
    }
  } catch (error) {
    console.error('Error al desinscribir al alumno del curso:', error);
    Swal.fire({
      title: 'Error',
      text: 'No se pudo desinscribir al alumno.',
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Cerrar',
    });
  }
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
      >
        <Box
          bg="negro-sec"
          border="1px solid #CBD5E0"
          ml={10}
          mt={5}
          mb={10}
          mr={10}
          borderRadius="8px"
          p={4}
        >
          <Heading as="h1" size="xl">
            Inscribir o desinscribir alumnos
          </Heading>
        </Box>
        <Box
          flex="2"
          bg="negro-sec"
          borderRadius="8px"
          p={4}
          ml={10}
          mt={5}
          mb={5}
          mr={10}
        >
          <VStack spacing={4}>
            <Select
              bg="amarillo"
              color="cafe"
              placeholder="Seleccionar alumno"
              value={selectedAlumnoId}
              onChange={(e) => setSelectedAlumnoId(e.target.value)}
            >
              {alumnos.map((alumno) => (
                <option key={alumno._id} value={alumno._id}>
                  {alumno.nombre} {alumno.apellido}
                </option>
              ))}
            </Select>
            <br />
            <Select
              bg="amarillo"
              color="cafe"
              placeholder="Seleccionar curso"
              value={selectedCursoId}
              onChange={(e) => setSelectedCursoId(e.target.value)}
            >
              {cursos.map((curso) => (
                <option key={curso._id} value={curso._id}>
                  {curso.nombre}
                </option>
              ))}
            </Select>
            <br />
            <Button
              bg="cafe"
              color="blanco"
              onClick={handleInscribirAlumnoClick}
            >
              Inscribir alumno
            </Button>
            <Button
              bg="red"
              color="blanco"
              onClick={handleDesinscribirAlumnoClick}
            >
              Desinscribir alumno
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default InscribirAlumnoPage;
