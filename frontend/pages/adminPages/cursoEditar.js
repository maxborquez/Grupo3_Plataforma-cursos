import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Button,
  HStack,
  VStack,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { getCursoById, updateCurso } from "../../data/cursosData";
import { getProfesores } from "../../data/usersData";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2"

const CursoEditar = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [curso, setCurso] = useState({
    nombre: "",
    descripcion: "",
    estado: "Disponible",
    fecha_inicio: "",
    fecha_fin: "",
    profesor: null,
  });
  const [profesores, setProfesores] = useState([]);

  const convertToDate = (dateString) => {
    return dateString ? new Date(dateString) : "";
  };

  const convertToISODate = (dateObject) => {
    return dateObject instanceof Date
      ? dateObject.toISOString().split("T")[0]
      : "";
  };

  useEffect(() => {
    const loadCursoDetalle = async () => {
      try {
        const response = await getCursoById(cursoId);
        if (response.state === "Success") {
          const cursoData = response.data;
          const cursoConFechas = {
            ...cursoData,
            fecha_inicio: convertToDate(cursoData.fecha_inicio),
            fecha_fin: convertToDate(cursoData.fecha_fin),
          };
          setCurso(cursoConFechas);
        } else {
          console.error("Error al obtener los detalles del curso:", response);
        }
      } catch (error) {
        console.error("Error al cargar los detalles del curso:", error);
      }
    };

    const loadProfesores = async () => {
      try {
        const response = await getProfesores();
        if (response.state === "Success") {
          setProfesores(response.data);
        } else {
          console.error("Error al obtener la lista de profesores:", response);
        }
      } catch (error) {
        console.error("Error al cargar la lista de profesores:", error);
      }
    };

    if (cursoId) {
      loadCursoDetalle();
    }

    loadProfesores();
  }, [cursoId]);

  const handleVolverClick = () => {
    router.back();
  };

  const handleUpdateCurso = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se guardarán los cambios en el curso.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateCurso(cursoId, curso);
          Swal.fire({
            title: "Perfil actualizado",
            text: "Los cambios han sido guardados exitosamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            router.push(`/adminPages/cursoDetalle/${userId}`);
          });
        } catch (error) {
          console.error("Error al actualizar el curso:", error);
          Swal.fire("Error", "Hubo un problema al guardar los cambios.", "error");
        }
      } else {
        Swal.fire("Cancelado", "Los cambios no han sido guardados.", "info");
      }
    });
  };

  if (!curso || profesores.length === 0) {
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
        ml={18}
        flexGrow={1}
      >
        <Heading as="h1" size="xl">
          Editar Curso
        </Heading>
        <VStack align="flex-start" mt={4} spacing={4}>
          <FormControl>
            <FormLabel>Nombre del curso</FormLabel>
            <Input
              type="text"
              value={curso.nombre}
              onChange={(e) => setCurso({ ...curso, nombre: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Descripción del curso</FormLabel>
            <Textarea
              value={curso.descripcion}
              onChange={(e) =>
                setCurso({ ...curso, descripcion: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Estado del curso</FormLabel>
            <Select
              value={curso.estado}
              onChange={(e) => setCurso({ ...curso, estado: e.target.value })}
            >
              <option value="Disponible">Disponible</option>
              <option value="Proximo">Próximo</option>
              <option value="Cerrado">Cerrado</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de inicio</FormLabel>
            <Input
              type="date"
              value={convertToISODate(curso.fecha_inicio)}
              onChange={(e) =>
                setCurso({ ...curso, fecha_inicio: new Date(e.target.value) })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de fin</FormLabel>
            <Input
              type="date"
              value={convertToISODate(curso.fecha_fin)}
              onChange={(e) =>
                setCurso({ ...curso, fecha_fin: new Date(e.target.value) })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Profesor</FormLabel>
            <Select
              value={curso.profesor ? curso.profesor._id : ""}
              onChange={(e) => {
                const selectedProfesor = profesores.find(
                  (profesor) => profesor._id === e.target.value
                );
                setCurso({ ...curso, profesor: selectedProfesor });
              }}
            >
              <option value="">Seleccionar profesor...</option>
              {profesores.map((profesor) => (
                <option key={profesor._id} value={profesor._id}>
                  {profesor.nombre} {profesor.apellido}
                </option>
              ))}
            </Select>
          </FormControl>
          <Divider />
          <HStack justifyContent="flex-end" spacing={4}>
            <Button colorScheme="gray" onClick={handleVolverClick}>
              Volver
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateCurso}>
              Guardar Cambios
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CursoEditar;
