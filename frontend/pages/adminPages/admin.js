import { Box, Heading } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar"; // Importa el componente Sidebar
import withAuth from "../../data/withAuth"; // Importa el componente withAuth

const AdminPage = () => {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box
        p={4}
        mt={4}
        ml={18}
        flexGrow={1}
        fontFamily="Baloo Bhai, sans-serif"
        display="flex"
      >
        <Box flex="2" display="flex" flexDirection="column">
          <Box
            flex="1"
            p={4}
            borderRadius="20px"
            bg="gray.100"
            textAlign="center"
            display="flex"
            alignItems="center"
            mb={18}
          >
            <Heading as="h1" size="xl">
              Parte 1 (arriba)
            </Heading>
          </Box>

          <Box
            flex="2"
            p={4}
            borderRadius="20px"
            bg="gray.200"
            textAlign="center"
            display="flex"
            alignItems="center"
          >
            <Heading as="h1" size="xl">
              Parte 1 (abajo)
            </Heading>
          </Box>
        </Box>

        <Box mx={18} />

        <Box
          flex="1"
          p={4}
          borderRadius="10px"
          bg="gray.300"
          textAlign="center"
          display="flex"
          alignItems="center"
        >
          <Heading as="h1" size="xl">
            Parte 2
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(AdminPage, "admin");
