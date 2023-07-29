import Link from 'next/link';
import { Box, Button, Heading, VStack, Text } from '@chakra-ui/react';

const IndexPage = () => {
  return (
    <Box p={4} bg="NegroPri" minHeight="100vh"> {/* Usamos el color primaryBlack de la paleta */}
      <VStack spacing={8} align="center">
        <br/>
        <br/>
        <Heading as="h1" size="2xl" textAlign="center" color="Naranja">
          Centro de Formación Tech
        </Heading>
        <Text fontSize="xl" textAlign="center" color="Blanco">
          Aprende y crece con nosotros.
        </Text>
        <Link href="/login">
          <Button colorScheme="Naranja" size="lg"> {/* Usamos el color naranjo de la paleta */}
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/signup">
          <Button colorScheme="Cafe" size="lg"> {/* Usamos el color café de la paleta */}
            Registrarse
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default IndexPage;
