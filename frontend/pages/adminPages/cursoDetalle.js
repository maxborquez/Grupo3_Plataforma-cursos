import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Divider,
  List,
  ListItem,
  UnorderedList,
  Badge,
} from "@chakra-ui/react";
import { getCursoById, deleteCurso } from "../../data/cursosData";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";

const CursoDetalle = () => {
  const router = useRouter();
  const { cursoId } = router.query;
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    const loadCursoDetalle = async () => {
      try {
        const response = await getCursoById(cursoId);
        if (response.state === "Success") {
          setCurso(response.data);
        } else {
          console.error("Error al obtener los detalles del curso:", response);
        }
      } catch (error) {
        console.error("Error al cargar los detalles del curso:", error);
      }
    };

    if (cursoId) {
      loadCursoDetalle();
    }
  }, [cursoId]);

  if (!curso) {
    return <div>Cargando...</div>;
  }

  const handleVolverClick = () => {
    router.back();
  };

  const handleEditarClick = () => {
    router.push(`/adminPages/cursoEditar/${cursoId}`);
  };

  const handleBorrarClick = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el curso de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCurso(id);
          Swal.fire({
            title: "Curso eliminado exitosamente",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            router.back();
          });
        } catch (error) {
          Swal.fire("Error", "Hubo un problema al eliminar el curso.", "error");
          console.error("Error al borrar el curso:", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "El curso no ha sido eliminado.", "info");
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
        ml={18}
        flexGrow={1}
      >
        <Heading as="h1" size="xl">
          {curso.nombre}
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          {curso.descripcion}
        </Text>
        <Box mt={4}>
          <Heading as="h3" size="lg">
            Información del curso
          </Heading>
          <VStack align="flex-start" mt={2} spacing={4}>
            <Text>
              <strong>Estado:</strong>{" "}
              <Badge
                colorScheme={curso.estado === "Disponible" ? "green" : "red"}
              >
                {curso.estado}
              </Badge>
            </Text>
            <Text>
              <strong>Fecha de inicio:</strong>{" "}
              {new Date(curso.fecha_inicio).toLocaleDateString()}
            </Text>
            <Text>
              <strong>Fecha de fin:</strong>{" "}
              {new Date(curso.fecha_fin).toLocaleDateString()}
            </Text>
            <Text>
              <strong>Profesor:</strong> {curso.profesor?.nombre}{" "}
              {curso.profesor?.apellido}
            </Text>
            <Divider />
            <Text>
              <strong>Clases:</strong>
              {curso.clases.length > 0 ? (
                <UnorderedList ml={4}>
                  {curso.clases.map((clase) => (
                    <ListItem key={clase._id}>
                      {clase.nombre} - Fecha:{" "}
                      {new Date(clase.fecha).toLocaleDateString()}
                    </ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay clases disponibles.
                </Text>
              )}
            </Text>
            <Divider />
            <Text>
              <strong>Avisos:</strong>
              {curso.avisos.length > 0 ? (
                <UnorderedList ml={4}>
                  {curso.avisos.map((aviso) => (
                    <ListItem key={aviso._id}>{aviso.contenido}</ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay avisos disponibles.
                </Text>
              )}
            </Text>
            <Divider />
            <Text>
              <strong>Calificaciones:</strong>
              {curso.calificaciones.length > 0 ? (
                <List ml={4}>
                  {curso.calificaciones.map((calificacion) => (
                    <ListItem key={calificacion}>{calificacion}</ListItem>
                  ))}
                </List>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay calificaciones disponibles.
                </Text>
              )}
            </Text>
            <Divider />
            <Text>
              <strong>Alumnos:</strong>
              {curso.alumnos.length > 0 ? (
                <UnorderedList ml={4}>
                  {curso.alumnos
                    .filter((alumno) => alumno.alumno)
                    .map((alumno) => (
                      <ListItem key={alumno._id}>
                        {alumno.alumno.nombre} {alumno.alumno.apellido} -
                        Estado: {alumno.estado}
                      </ListItem>
                    ))}
                </UnorderedList>
              ) : (
                <Text ml={4} fontStyle="italic">
                  Aún no hay alumnos inscritos.
                </Text>
              )}
            </Text>
          </VStack>
        </Box>
        <HStack mt={4} justifyContent="flex-end">
          <Button
            colorScheme="blue"
            size="sm"
            onClick={handleEditarClick}
          >
            Editar
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => handleBorrarClick(curso._id)}
          >
            Borrar
          </Button>
          <Button colorScheme="gray" size="sm" onClick={handleVolverClick}>
            Volver
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default CursoDetalle;
